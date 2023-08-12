window.customCards = window.customCards || [];
window.customCards.push({
  type: "toggle-control-button",
  name: "Toggle Control Button",
  description: "A plugin to display your binary entity in a button row with a single button.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class CustomToggleButton extends LitElement {
    constructor() {
		super();
		this._config = {
			customTheme: false,
            width: '30px',
            height: '30px',
            isOnColor: '#43A047',
            isOffColor: '#f44c09',
            isOnTextColor: '#FFFFFF',
            isOffTextColor: '#FFFFFF',
            customOffText: 'OFF',
            customOnText: 'ON',
            unlockedColor: '#43A047',
            lockedColor: '#f44c09',
            unlockedTextColor: '#FFFFFF',
            lockedTextColor: '#FFFFFF',
            unlockingColor: 'gray',
            lockingColor: 'gray',
            unlockingTextColor: '#FFFFFF',
            lockingTextColor: '#FFFFFF',
            customUnlockedText: 'LOCK',
            customLockedText: 'UNLOCK',
            customUnlockingText: 'UNLOCKING',
            customLockingText: 'LOCKING',
		};
	}

    static get properties() {
        return {
            hass: Object,
            _config: Object,
            _stateObj: Object,
            _width: String,
            _height: String,
            _buttonColor: String,
            _buttonText: String,
            _buttonName: String,
            _buttonState: Boolean,
        }
    }

    static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.box {
				display: flex;
				flex-direction: row;
			}
			.switch {
                margin-left: 2px;
                margin-right: 2px;
                background-color: #759aaa;
                border: 1px solid lightgrey;
                border-radius: 4px;
                font-size: 10px !important;
                color: inherit;
                text-align: center;
                float: right !important;
                padding: 1px;
                cursor: pointer;
			}
		`;
	}

	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='box'>
					<button
						class='switch'
						style='${this._buttonColor};min-width:${this._width};max-width:${this._width};height:${this._height}'
						toggles name="${this._buttonName}"
						@click=${this.setState}>${this._buttonText}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}

    firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

    setConfig(config) {
        this._config = { ...this._config, ...config };
    }

    updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}

    hassChanged() {
        const config = this._config;
        const stateObj = this.hass.states[config.entity];
        const custTheme = config.customTheme;
        const buttonWidth = config.width;
        const buttonHeight = config.height;
        const custOnClr = config.isOnColor;
        const custOffClr = config.isOffColor;
        const custOnTxtClr = config.isOnTextColor;
        const custOffTxtClr = config.isOffTextColor;
        const custOffTxt = config.customOffText;
        const custOnTxt = config.customOnText;
        const unlockedClr = config.unlockedColor
        const lockedClr = config.lockedColor
        const unlockedTxtClr = config.unlockedTextColor
        const lockedTxtClr = config.lockedTextColor
        const unlockingClr = config.unlockingColor
        const lockingClr = config.lockingColor
        const unlockingTxtClr = config.unlockingTextColor
        const lockingTxtClr = config.lockingTextColor
        const custUnlockedTxt = config.customUnlockedText
        const custLockedTxt = config.customLockedText
        const custUnlockingTxt = config.customUnlockingText
        const custLockingTxt = config.customLockingText


        let state;
        if (stateObj) {
            state = stateObj.state;
        }

        let color;

        if (state == 'on' || state == 'off' ||
            state == 'locked' || state == 'unlocked' ||
            state == 'locking' || state == 'unlocking') {
            if (custTheme) {
                switch(state){
                    case 'on':
                        color = 'background-color:' + custOnClr + ';color:' + custOnTxtClr;
                        break;
                    case 'off':
                        color = 'background-color:' + custOffClr+ ';color:' + custOffTxtClr;
                        break;
                    case 'unlocked':
                        color = 'background-color:' + unlockedClr+ ';color:' + unlockedTxtClr;
                        break;
                    case 'locked':
                        color = 'background-color:' + lockedClr+ ';color:' + lockedTxtClr;
                        break;
                    case 'unlocking':
                        color = 'background-color:' + unlockingClr+ ';color:' + unlockingTxtClr;
                        break;
                    case 'locking':
                        color = 'background-color:' + lockingClr+ ';color:' + lockingTxtClr;
                        break;
                    default:
                        color = 'background-color: var(--disabled-text-color)';

                }
            } else {
                if (state == 'on' || state == 'unlocked') {
                    color = 'background-color: var(--primary-color)';
                } else {
                    color = 'background-color: var(--disabled-text-color)';
                }
            }
        } else {
            color = '#cfccc6';
        }

        let offtext = custOffTxt;
        let ontext = custOnTxt;
        let unlockedtext = custUnlockedTxt;
        let lockedtext = custLockedTxt;
        let unlockingtext = custUnlockingTxt;
        let lockingtext = custLockingTxt;
        let unavailtext = 'N/A';
        let buttonwidth = buttonWidth;
        let buttonheight = buttonHeight;

        let unavailname = 'unavailable';

        if (state == 'off') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _buttonName: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonColor: color,
            _buttonText: offtext,
            });
        } else if (state == 'on') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: ontext,
            });
        } else if (state == 'locked') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: lockedtext,
            });
        } else if (state == 'unlocked') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: unlockedtext,
            });
        } else if (state == 'locking') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: lockingtext,
            });
        } else if (state == 'unlocking') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: unlockingtext,
            });
        } else {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _buttonName: unavailname,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonColor: color,
            _buttonText: unavailtext,
            });
        }
    }

    setState(e) {
        const state = e.currentTarget.getAttribute('name');
        if( state == 'off' ){
            this.hass.callService('homeassistant', 'turn_on', {entity_id: this._config.entity});
        } else if (state == 'on' ) {
            this.hass.callService('homeassistant', 'turn_off', {entity_id: this._config.entity});
        } else if (state == 'locked'){
            this.hass.callService('lock', 'unlock', {entity_id: this._config.entity});
        } else if (state == 'unlocked'){
            this.hass.callService('lock', 'lock', {entity_id: this._config.entity});
        }
    }
}

customElements.define('toggle-control-button', CustomToggleButton);
