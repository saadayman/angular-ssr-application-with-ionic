import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class NIX_Timer {
      startTime;
      pauseTime; 
    constructor() {
      this.startTime = null;
      this.pauseTime = null;
    }
  
    start() {
      this.startTime = new Date(); // Capture start time
      console.log("Started at:", this.startTime);
    }
  
    pause() {
      this.pauseTime = new Date(); // Capture pause time
      console.log("Paused at:", this.pauseTime);
    }
  
    getElapsedTime() {
      if (this.startTime && this.pauseTime) {
        const elapsedMilliseconds = this.pauseTime - this.startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        console.log(`Elapsed time: ${elapsedSeconds} seconds`);
        return elapsedSeconds;
      } else {
        console.log("Timer has not been started and paused properly.");
        return null;
      }
    }
  }