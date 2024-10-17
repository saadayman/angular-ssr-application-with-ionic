import { Directive, HostListener, Input, input } from "@angular/core";
import { NavigationService } from "src/provider/tools/NIX_Navigation.service";
import { DetachControlService } from "../custom_resuse_route_strategy/detach-hanlder.service";

@Directive({
  selector: "[backButton]",
  standalone: true
})
export class BackButtonDirective {
  state = input();
  navigateTo = input<string>()
  resetNavigation = input<boolean>()
  removeFromCacheKey = input<string>()
  constructor(private navigation: NavigationService,private cacheHandler:DetachControlService) {}

  @HostListener("click")
  onClick(): void {
    if(this.removeFromCacheKey()){
      this.cacheHandler.setDetachValue(this.removeFromCacheKey(),false)
    }
    this.navigation.close(this.state(),this.navigateTo(),this.resetNavigation());
  }
}
