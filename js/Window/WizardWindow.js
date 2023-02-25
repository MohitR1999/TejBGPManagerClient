class WizardWindow {
    /**
     * Returns a window
     * @param {Object} config Configuration of the window 
     * @param {String} config.id unique id of the window 
     * @param {String} config.text header of the window 
     * @param {Number} config.left left coordinate of the window 
     * @param {Number} config.top right coordinate of the window 
     * @param {Number} config.width width of the window 
     * @param {Number} config.height height of the window 
     * @param {Object} formConfig Configuration of the form to be attached
     * @param {Object} parent Parent Layout if present (optional)
     */
    constructor(config, formConfig, parent) {
        const _self = this;
        this.wizardWindow = null;
        if (parent) {
            // parent layout is present hence we use that
            this.wizardWindow = parent.dhxWins.createWindow(config.id, config.left, config.top, config.width, config.height);
        } else {
            this.wins = new dhtmlXWindows();
            this.wizardWindow = this.wins.createWindow(config.id, config.left, config.top, config.width, config.height);
        }
        this.form = this.wizardWindow.attachForm(formConfig);
        this.wizardWindow.setText(config.text);
        this.wizardWindow.keepInViewport(true);
        this.wizardWindow.center();
        this.wizardWindow.setModal(true);
        this.wizardWindow.attachEvent("onClose", function(win) {
            _self.hide();
        })
    }

    show() {
        this.wizardWindow.show();
        this.wizardWindow.setModal(true);
    }

    hide() {
        this.wizardWindow.hide();
        this.wizardWindow.setModal(false);
    }

    progressOn() {
        this.wizardWindow.progressOn();
    }

    progressOff() {
        this.wizardWindow.progressOff();
    }

    getForm() {
        return this.form;
    }
}