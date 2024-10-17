import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart, Event, NavigationEnd, NavigationSkipped } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private navigationState: any;
  private readonly STORAGE_KEY = 'navigationStack';

  public url: string;
  public backEvent: Subject<void> = new Subject<void>();

  // Maintain a navigation stack to track history manually - while not refreshing
  public navigationStack: string[] = [];
  private isNavigatingFromHistory = false;
  private isNavigating = false;

  constructor(
    private router: Router,
    private location: Location,
  ) {
    // Subscribe to location so that i can check if the user is navigating using backbutton or history arrow , since in history navigation i dont want to update the stack 
    this.location.subscribe(() => {
      this.isNavigatingFromHistory = true;
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating = true;
        if (this.isNavigatingFromHistory) {
          this.updateNavigationStackFromHistoryNavigation(event.url)
          this.isNavigatingFromHistory = false;
          this.isNavigating=false
          return;
        }
        // If the stack is empty, push the new URL
        if (this.navigationStack?.length === 0) {
          this.navigationStack.push(event.url);
        } else {
          // Check if the current URL is the same as the last one in the stack (excluding query parameters) since i  only need to check if the user navigated to this page as well as i always save the most updated version of the url so there is no duplicates|
          const currentUrl = this.navigationStack[this.navigationStack.length - 1].split('?')[0];
          const newUrl = event.url.split('?')[0];
          if (currentUrl === newUrl) {
            
            // Replace the last entry in the stack with the new URL
            this.navigationStack[this.navigationStack.length - 1] = event.url;
          } else {
            // Push the new URL to the stack if it's a completely different route
            this.navigationStack.push(event.url);
          }
        }
       // Save the updated navigation stack to session storage , because opening multiple tabs would cause the back functionality to fail.
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.navigationStack));
      }
      

      if (event instanceof NavigationEnd) {
        this.isNavigating = false;
      }
      if(event instanceof NavigationSkipped){
        this.isNavigating = false;
      }
    });

  }

  async close(state?: any, navigateTo?: string, resetNavigation?: boolean): Promise<void> {
    if (this.isNavigating) return; // Prevent multiple navigations

    this.navigationState = state;
    this.navigationStack.pop(); // Remove current URL from the stack
    let previousUrl = this.navigationStack.pop()  || '/'; // Get the previous URL
    if (previousUrl === this.router.url) { // if navigated from history and previous url equals the active route pop the active and move backward
      previousUrl = this.navigationStack.pop()
    }
    if (navigateTo) { // if navigate to is provided the back function will check if there is a url related to it in the stack if yes it will navigate to it this is incase of a page is being opened from multiple places
      const foundUrl = this.navigationStack.find(url => url.includes(navigateTo));
      if (foundUrl) {
        previousUrl = foundUrl;
      }else if(!previousUrl?.includes(navigateTo)){//this will check if the navigate to is not as the previous url that you came from it will navigate you to the main page , example case - direct navigation to a page that might be opened from multiple places.
        previousUrl = '/'
      }
    }
    if (resetNavigation) { // if navigating to a place where i need to start the stack from the beginning
      this.navigationStack= [];
    }
    if (previousUrl) {
      const state_from_history: any = this.location.getState()
      await this.router.navigateByUrl(previousUrl, { state: { ...state_from_history, ...this.navigationState } });
    } else {
      await this.router.navigate(['/']); // Default fallback
    }

    if (state) { // if passing data from user to subscribers
      this.backEvent.next();
    }


    // Update the storage after navigating back
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.navigationStack));
  }

  async navigate(route: any[], data?: any): Promise<boolean> {
    try {
     const navigation_result=   await this.router.navigate([...route], {
        queryParams: {
          ...data?.query_params
        },
        state: {
          url: this.router.url,
          ...data?.state
        }
      });
      return navigation_result
    } catch (error) {
      this.navigationStack.pop() // so that we remove the navigation from the stack that was pushed on navigation start in case of error and not being able to navigate
      console.log('Error while navigating:', error);
      return false
    } 
  }

  getNavigationState(): any {
    return this.navigationState;
  }

  resetNavigationService(){
    this.navigationState = null;
    this.navigationStack= [];
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
   loadStack() {
    const stack = sessionStorage.getItem(this.STORAGE_KEY);
    return stack;
  }
private updateNavigationStackFromHistoryNavigation(newUrlWithQuery: string): void {
  const newUrl = newUrlWithQuery.split('?')[0];
  const existingIndex = this.navigationStack.findIndex(url => url.split('?')[0] === newUrl);

  if (existingIndex !== -1) {
    // If the URL exists in the stack, remove all entries above it
    this.navigationStack = this.navigationStack.slice(0, existingIndex + 1);
    // Replace the last entry with the most updated version of the URL
    this.navigationStack[existingIndex] = newUrlWithQuery;
  } else {
    // Push the new URL to the stack if it's a completely different route
    this.navigationStack.push(newUrlWithQuery);
  }

  // Save the updated navigation stack to session storage
  sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.navigationStack));
}
}
