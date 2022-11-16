import CePage from "../custom-element/ce-page.js";

export default class HomePage {
    private parent: CePage;
    private hooks;

    private avatarList: Array<number> = [1, 2, 3, 4];
    private currentAvatar: number = 0;
    private baseAvatarIconSrc: string = "public/illustrations/avatar/avatar";

    constructor(parent: CePage, hooks: Record<string, any>) {
        this.parent = parent;
        this.hooks = hooks;

        this.hooks.firstDotSelected.value = true;
        this.hooks.secondDotSelected.value = false;

        this.hooks.firstMobileDotSelected.value = true;
        this.hooks.secondMobileDotSelected.value = false;
        this.hooks.thirdMobileDotSelected.value = false;

        this.hooks.firstBoxLeft.value = "-0%";
        this.hooks.secondBoxLeft.value = "100%";

        this.hooks.firstMobileBoxLeft.value = "-0%";
        this.hooks.secondMobileBoxLeft.value = "100%";
        this.hooks.firstMobileBoxTop.value = "-0%";
        this.hooks.verticalMobileBoxTop.value = "100%";

        this.hooks.arrowOpacity.value = "0";
        this.hooks.arrowOpacityMobile.value = "0";

        this.hooks.playButtonClicked.value = this.nextSlide;
        this.hooks.playButtonMobileClicked.value = this.nextSlide;

        this.hooks.arrowBackClicked.value = this.previousSlide;
        this.hooks.arrowBackMobileClicked.value = this.previousSlide;

        this.hooks.readRulesButtonClicked.value = this.showRules;
        this.hooks.rulesArrowBack.value = this.hideRules;
        this.hooks.rulesButtonBack.value = this.hideRules;
        this.hooks.avatarIconSrc.value = this.baseAvatarIconSrc + this.avatarList[this.currentAvatar] + ".svg";
        this.hooks.mobileAvatarIconSrc.value = this.baseAvatarIconSrc + this.avatarList[this.currentAvatar] + ".svg";

        this.hooks.changeAvatar.value = this.changeAvatar;
        this.hooks.mobileChangeAvatar.value = this.changeAvatar;

        this.hooks.hamburgerMenuCliked.value = this.toggleMobileMenu,

        this.calcWindowDimensions();
        this.bindResizeEvent();
    }

    bindResizeEvent() {
        window.addEventListener('resize', this.calcWindowDimensions);
    }

    calcWindowDimensions = () => {
        let currentWidth = document.documentElement.clientWidth;
        let currentHeight = document.documentElement.clientHeight;

        let initialWidth = 1920;
        let initialHeight = 1080;

        let widthRatio = currentWidth / initialWidth;
        let heightRatio = currentHeight / initialHeight;

        if(widthRatio < heightRatio) {
            this.hooks.pageScale.value = widthRatio;
        } else {
            this.hooks.pageScale.value = heightRatio;
        }
    }

    changeAvatar = () => {
        this.currentAvatar += 1;
        if(this.currentAvatar == this.avatarList.length) {
            this.currentAvatar = 0;
        }

        this.hooks.avatarIconSrc.value = this.baseAvatarIconSrc + this.avatarList[this.currentAvatar] + ".svg";
        this.hooks.mobileAvatarIconSrc.value = this.baseAvatarIconSrc + this.avatarList[this.currentAvatar] + ".svg";
    }

    previousSlide = () => {
        this.hooks.firstDotSelected.value = true;
        this.hooks.secondDotSelected.value = false;

        this.hooks.firstMobileDotSelected.value = true;
        this.hooks.secondMobileDotSelected.value = false;

        this.hooks.firstBoxLeft.value = "-0%";
        this.hooks.secondBoxLeft.value = "100%";

        this.hooks.firstMobileBoxLeft.value = "-0%";
        this.hooks.secondMobileBoxLeft.value = "100%";

        this.hooks.arrowOpacity.value = "0";
        this.hooks.arrowOpacityMobile.value = "0";
    }

    nextSlide = () => {
        this.hooks.firstDotSelected.value = false;
        this.hooks.secondDotSelected.value = true;

        this.hooks.firstMobileDotSelected.value = false;
        this.hooks.secondMobileDotSelected.value = true;

        this.hooks.firstBoxLeft.value = "-100%";
        this.hooks.secondBoxLeft.value = "0%";

        this.hooks.firstMobileBoxLeft.value = "-100%";
        this.hooks.secondMobileBoxLeft.value = "0%";

        setTimeout(() => {
            this.hooks.arrowOpacity.value = "1";
            this.hooks.arrowOpacityMobile.value = "1";
        }, 400);
    }

    showRules = () => {
        this.hooks.firstMobileBoxTop.value = "-100%";
        this.hooks.verticalMobileBoxTop.value = "0%";
    }

    hideRules = () => {
        this.hooks.firstMobileBoxTop.value = "-0%";
        this.hooks.verticalMobileBoxTop.value = "100%";
    }

    toggleMobileMenu = (event) => {
        console.log('test')

        if(event.target.checked) document.getElementById('mobileMenu').classList.add('mobileMenuOpen');
        else document.getElementById('mobileMenu').classList.remove('mobileMenuOpen');
    }
}