// Name: Gamepad
// ID: Gamepad
// Description: Directly access gamepads instead of just mapping buttons to keys.

// Some parts of this scripts are based on or designed to be compatible-ish with:
// https://arpruss.github.io/gamepad.js (MIT Licensed)

/* generated l10n code */Scratch.translate.setup({"it":{"_D-pad down (14)":"Tasto direzionale giù (14)","_D-pad left (15)":"Tasto direzionale sinistra (15)","_D-pad right (16)":"Tasto direzionale destra (16)","_D-pad up (13)":"Tasto direzionale su (13)","_Left bumper (5)":"Pulsante dorsale sinistro (5)","_Left stick (1 & 2)":"Levetta sinistra (1 & 2)","_Left stick (11)":"Levetta sinistra (11)","_Left stick horizontal (1)":"Levetta sinistra orizzontale (1)","_Left stick vertical (2)":"Levetta sinistra verticale (2)","_Left trigger (7)":"Grilleto sinistro (7)","_Right bumper (6)":"Pulsante dorsale destro (6)","_Right stick (12)":"Levetta destra (12)","_Right stick (3 & 4)":"Levetta destra (3 & 4)","_Right stick horizontal (3)":"Levetta destra orizzontale (3)","_Right stick vertical (4)":"Levetta destra verticale (4)","_Right trigger (8)":"Grilleto destro (8)","_Select/View (9)":"Seleziona/Visualizza (9)","_Start/Menu (10)":"Inizia/Menu (10)","_any":"qualunque","_button [b] on pad [i] pressed?":"pulsante [b] del pad [i] premuto","_direction of axes [axis] on pad [pad]":"direzione degli assi [axis] del pad [pad]","_gamepad [pad] connected?":"gamepad [pad] connesso","_magnitude of axes [axis] on pad [pad]":"valore degli assi [axis] del pad [pad]","_rumble strong [s] and weak [w] for [t] sec. on pad [i]":"vibrazione forte [s] e piano [w] per [t] sec. sul pad [i]","_value of axis [b] on pad [i]":"valore dell'asse [b] del pad [i]","_value of button [b] on pad [i]":"valore del pulsante [b] del pad [i]"},"nl":{"_D-pad down (14)":"omlaag (14)","_D-pad left (15)":"links (15)","_D-pad right (16)":"rechts (16)","_D-pad up (13)":"omhoog (13)","_Left bumper (5)":"linker bumper (5)","_Left stick (1 & 2)":"linker stick (1 & 2)","_Left stick (11)":"linker stick (11)","_Left stick horizontal (1)":"linker stick horizontaal (1)","_Left stick vertical (2)":"linker stick verticaal (2)","_Left trigger (7)":"linker trigger (7)","_Right bumper (6)":"rechter bumper (6)","_Right stick (12)":"rechter stick (12)","_Right stick (3 & 4)":"rechter stick (3 & 4)","_Right stick horizontal (3)":"rechter stick horizontaal (3)","_Right stick vertical (4)":"rechter stick verticaal (4)","_Right trigger (8)":"rechter trigger (8)","_Select/View (9)":"selecteer/bekijk (9)","_Start/Menu (10)":"start/menu (10)","_any":"willekeurig","_button [b] on pad [i] pressed?":"knop [b] op gamepad [i] ingedrukt?","_direction of axes [axis] on pad [pad]":"richting van assen [axis] op gamepad [pad]","_gamepad [pad] connected?":"gamepad [pad] verbonden?","_magnitude of axes [axis] on pad [pad]":"afstand van assen [axis] op gamepad [pad]","_rumble strong [s] and weak [w] for [t] sec. on pad [i]":"vibreer sterk [s] en zwak [w] voor [t] seconden op gamepad [i]","_value of axis [b] on pad [i]":"waarde van as [b] op gamepad [i]","_value of button [b] on pad [i]":"waarde van knop [b] op gamepad [i]"},"ru":{"_Gamepad":"Геймпад","_button [b] on pad [i] pressed?":"триггер [b] на геймпаде [i] нажат?","_direction of axes [axis] on pad [pad]":"направление на оси [axis] на геймпаде [pad]","_gamepad [pad] connected?":"геймпад [pad] подключен?","_magnitude of axes [axis] on pad [pad]":"величина на оси [axis] на геймпаде [pad]","_value of axis [b] on pad [i]":"значение на оси [b] на геймпаде [i]","_value of button [b] on pad [i]":"значение на триггере [b] на геймпаде [i]"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  const AXIS_DEADZONE = 0.1;
  const BUTTON_DEADZONE = 0.05;

  /**
   * @param {number|'any'} index 1-indexed index
   * @returns {Gamepad[]}
   */
  const getGamepads = (index) => {
    if (index === "any") {
      return navigator.getGamepads().filter((i) => i);
    }
    const gamepad = navigator.getGamepads()[index - 1];
    if (gamepad) {
      return [gamepad];
    }
    return [];
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number|'any'} buttonIndex 1-indexed index
   * @returns {boolean} false if button does not exist
   */
  const isButtonPressed = (gamepad, buttonIndex) => {
    if (buttonIndex === "any") {
      return gamepad.buttons.some((i) => i.pressed);
    }
    const button = gamepad.buttons[buttonIndex - 1];
    if (!button) {
      return false;
    }
    return button.pressed;
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number} buttonIndex 1-indexed index
   * @returns {number} 0 if button does not exist
   */
  const getButtonValue = (gamepad, buttonIndex) => {
    const button = gamepad.buttons[buttonIndex - 1];
    if (!button) {
      return 0;
    }
    const value = button.value;
    if (value < BUTTON_DEADZONE) {
      return 0;
    }
    return value;
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number} axisIndex 1-indexed index
   * @returns {number} 0 if axis does not exist
   */
  const getAxisValue = (gamepad, axisIndex) => {
    const axisValue = gamepad.axes[axisIndex - 1];
    if (typeof axisValue !== "number") {
      return 0;
    }
    if (Math.abs(axisValue) < AXIS_DEADZONE) {
      return 0;
    }
    return axisValue;
  };

  class GamepadExtension {
    getInfo() {
      return {
        id: "Gamepad",
        name: Scratch.translate("Gamepad"),
        blocks: [
          {
            opcode: "gamepadConnected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("是否与 [pad] 手柄连接?"),
            arguments: {
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },
          {
            opcode: "buttonDown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("手柄 [i] 上的按键 [b] 是否按下?"),
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "buttonMenu",
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },
          {
            opcode: "buttonValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("手柄 [i] 上按键 [b] 的值"),
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "buttonMenu",
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },
          {
            opcode: "axisValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("手柄 [i] 上 [b] 的轴值"),
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "axisMenu",
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },

          "---",

          {
            opcode: "axisDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("手柄 [pad] 上 [axis] 的方向"),
            arguments: {
              axis: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "axesGroupMenu",
              },
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },
          {
            opcode: "axisMagnitude",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("手柄 [pad] 上 [axis] 的幅度"),
            arguments: {
              axis: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "axesGroupMenu",
              },
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },

          /*
          {
            opcode: 'buttonPressedReleased',
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate('button [b] [pr] of pad [i]'),
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              pr: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'pressReleaseMenu'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          {
            opcode: 'axisMoved',
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate('axis [b] of pad [i] moved'),
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },
          */

          "---",

          {
            opcode: "rumble",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "在手柄 [i] 上发出 [t] 秒强 [s] 弱 [w] 的震动"
            ),
            arguments: {
              s: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.25",
              },
              w: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.5",
              },
              t: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.25",
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
                menu: "padMenu",
              },
            },
          },
        ],
        menus: {
          padMenu: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("任意"),
                value: "any",
              },
              {
                text: "1",
                value: "1",
              },
              {
                text: "2",
                value: "2",
              },
              {
                text: "3",
                value: "3",
              },
              {
                text: "4",
                value: "4",
              },
            ],
          },
          buttonMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: Scratch.translate("any"),
                value: "any",
              },
              {
                text: "A (1)",
                value: "1",
              },
              {
                text: "B (2)",
                value: "2",
              },
              {
                text: "X (3)",
                value: "3",
              },
              {
                text: "Y (4)",
                value: "4",
              },
              {
                text: Scratch.translate("LB (5)"),
                value: "5",
              },
              {
                text: Scratch.translate("RB (6)"),
                value: "6",
              },
              {
                text: Scratch.translate("LT (7)"),
                value: "7",
              },
              {
                text: Scratch.translate("RT (8)"),
                value: "8",
              },
              {
                text: Scratch.translate("选择 / 查看 (9)"),
                value: "9",
              },
              {
                text: Scratch.translate("开始 / 菜单 (10)"),
                value: "10",
              },
              {
                text: Scratch.translate("LS (11)"),
                value: "11",
              },
              {
                text: Scratch.translate("RS (12)"),
                value: "12",
              },
              {
                text: Scratch.translate("松开 D-pad (13)"),
                value: "13",
              },
              {
                text: Scratch.translate("按下 D-pad (14)"),
                value: "14",
              },
              {
                text: Scratch.translate("D-pad 向左 (15)"),
                value: "15",
              },
              {
                text: Scratch.translate("D-pad 向右 (16)"),
                value: "16",
              },
            ],
          },
          axisMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: Scratch.translate("LS 水平 (1)"),
                value: "1",
              },
              {
                text: Scratch.translate("LS 垂直 (2)"),
                value: "2",
              },
              {
                text: Scratch.translate("RS 水平 (3)"),
                value: "3",
              },
              {
                text: Scratch.translate("RS 垂直 (4)"),
                value: "4",
              },
            ],
          },
          axesGroupMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: Scratch.translate("LS (1 & 2)"),
                value: "1",
              },
              {
                text: Scratch.translate("RS (3 & 4)"),
                value: "3",
              },
            ],
          },
          /*
          pressReleaseMenu: [
            {
              text: Scratch.translate('press'),
              value: 1
            },
            {
              text: Scratch.translate('release'),
              value: 0
            }
          ],
          */
        },
      };
    }

    gamepadConnected({ pad }) {
      return getGamepads(pad).length > 0;
    }

    buttonDown({ b, i }) {
      for (const gamepad of getGamepads(i)) {
        if (isButtonPressed(gamepad, b)) {
          return true;
        }
      }
      return false;
    }

    buttonValue({ b, i }) {
      let greatestButton = 0;
      for (const gamepad of getGamepads(i)) {
        const value = getButtonValue(gamepad, b);
        if (value > greatestButton) {
          greatestButton = value;
        }
      }
      return greatestButton;
    }

    axisValue({ b, i }) {
      let greatestAxis = 0;
      for (const gamepad of getGamepads(i)) {
        const axis = getAxisValue(gamepad, b);
        if (Math.abs(axis) > Math.abs(greatestAxis)) {
          greatestAxis = axis;
        }
      }
      return greatestAxis;
    }

    axisDirection({ axis, pad }) {
      let greatestMagnitude = 0;
      let direction = 90;
      for (const gamepad of getGamepads(pad)) {
        const horizontalAxis = getAxisValue(gamepad, axis);
        const verticalAxis = getAxisValue(gamepad, +axis + 1);
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);
        if (magnitude > greatestMagnitude) {
          greatestMagnitude = magnitude;
          direction =
            (Math.atan2(verticalAxis, horizontalAxis) * 180) / Math.PI + 90;
          if (direction < 0) {
            direction += 360;
          }
        }
      }
      return direction;
    }

    axisMagnitude({ axis, pad }) {
      let greatestMagnitude = 0;
      for (const gamepad of getGamepads(pad)) {
        const horizontalAxis = getAxisValue(gamepad, axis);
        const verticalAxis = getAxisValue(gamepad, +axis + 1);
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);
        if (magnitude > greatestMagnitude) {
          greatestMagnitude = magnitude;
        }
      }
      return greatestMagnitude;
    }

    rumble({ s, w, t, i }) {
      const gamepads = getGamepads(i);
      for (const gamepad of gamepads) {
        // @ts-ignore
        if (gamepad.vibrationActuator) {
          // @ts-ignore
          gamepad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: t * 1000,
            weakMagnitude: w,
            strongMagnitude: s,
          });
        }
      }
    }
  }

  Scratch.extensions.register(new GamepadExtension());
})(Scratch);
