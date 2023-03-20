class Tabs{
    static CLASS_TABS = 'main-tabs'
    static CLASS_NAV_BUTTON = 'main-tabs__button'
    static CLASS_NAV_CONTENT_ITEM = 'main-tabs__content-item'
    static CLASS_ACTIVE_BUTTON = 'active-button'
    static CLASS_ACTIVE_ITEM = 'active-item'
    static CURRENT_ELEMENT_NUMBER = 0
    static NEW_CURRENT_ELEMENT_NUMBER = 0

    constructor(rootElement){
        this.rootElement = rootElement
        this.navItems = this.getNavItems(rootElement)
        this.contentItems = this.contentItems(rootElement)
        this.setStyles()
        this.bindEvents()
    }

    setStyles(){
        this.rootElement.classList.add(Tabs.CLASS_TABS)
        this.navItems.forEach((item) => {
            item.classList.add(Tabs.CLASS_NAV_BUTTON)
        })
        this.contentItems.forEach((item) => {
            item.classList.add(Tabs.CLASS_NAV_CONTENT_ITEM)
        })
        this.navItems[Tabs.CURRENT_ELEMENT_NUMBER].classList.add(Tabs.CLASS_ACTIVE_BUTTON)
        this.contentItems[Tabs.CURRENT_ELEMENT_NUMBER].classList.add(Tabs.CLASS_ACTIVE_ITEM)
    }

    bindEvents(){
        this.rootElement.addEventListener('click', (e) => this.onRootElClick(e))
    }

    onRootElClick(e){
        const target = e.target
        const currentButton = this.findButton(target)
        if(currentButton) this.setNewCurrentElementNumber(currentButton)
        const currentContentItem = this.findContentElement()
        if (!currentButton) {
            return
        }
        if(Tabs.CURRENT_ELEMENT_NUMBER !== Tabs.NEW_CURRENT_ELEMENT_NUMBER){
            this.showNewContent(currentButton, currentContentItem)
        }
    }

    findButton(element){
        return element.closest('.' + Tabs.CLASS_NAV_BUTTON)
    }

    findContentElement(){
        return this.contentItems[Tabs.NEW_CURRENT_ELEMENT_NUMBER]
    }

    showNewContent(currentButton, currentContentElement){
        this.toggleClass(currentButton, Tabs.CLASS_ACTIVE_BUTTON)
        this.toggleClass(currentContentElement, Tabs.CLASS_ACTIVE_ITEM)
        this.toggleClass(this.contentItems[Tabs.CURRENT_ELEMENT_NUMBER], Tabs.CLASS_ACTIVE_ITEM)
        this.toggleClass(this.navItems[Tabs.CURRENT_ELEMENT_NUMBER], Tabs.CLASS_ACTIVE_BUTTON)
        Tabs.CURRENT_ELEMENT_NUMBER = Tabs.NEW_CURRENT_ELEMENT_NUMBER
    }

    getNavItems(element){
        return Array.from(Array.from(element.children)[0].children)
    }

    contentItems(element){
        return Array.from(Array.from(element.children)[1].children)
    }

    setNewCurrentElementNumber(element){
        Tabs.NEW_CURRENT_ELEMENT_NUMBER = this.navItems.indexOf(element)
    }

    toggleClass(element, toggledClass){
        element.classList.toggle(toggledClass)
    }
}