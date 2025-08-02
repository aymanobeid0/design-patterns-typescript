// bad example
//problem: The code is not scalable and violates the Open/Closed Principle.
// It requires modification to add support for new operating systems.
// solution: Use the Abstract Factory pattern to create a family of related objects without specifying their concrete classes.
class Button {
  render(os: string): void {
    if (os === "windows") {
      console.log("Render Windows Button");
    } else if (os === "mac") {
      console.log("Render Mac Button");
    }
  }
}

class Checkbox {
  render(os: string): void {
    if (os === "windows") {
      console.log("Render Windows Checkbox");
    } else if (os === "mac") {
      console.log("Render Mac Checkbox");
    }
  }
}

class Application {
  private button: Button;
  private checkbox: Checkbox;
  private os: string;

  constructor(os: string) {
    this.button = new Button();
    this.checkbox = new Checkbox();
    this.os = os;
  }

  renderUI(): void {
    this.button.render(this.os);
    this.checkbox.render(this.os);
  }
}

const app = new Application("mac");
app.renderUI();

//good example
//creation of elements
interface IButton {
  render(): void;
}
interface ICheckbox {
  render(): void;
}
//creation the ui based on system type winows mac linux
interface IUIFactory {
  createButton(): IButton;
  createCheckbox(): ICheckbox;
}

//now the implementation for every ui element
class WindowsButton implements IButton {
  render() {
    console.log("Render Windows Button");
  }
}
class WindowsCheckbox implements ICheckbox {
  render() {
    console.log("Render Windows Checkbox");
  }
}
class MacButton implements IButton {
  render(): void {
    console.log("Render Mac Button");
  }
}
class MacCheckbox implements ICheckbox {
  render(): void {
    console.log("Render Mac Checkbox");
  }
}

//creation of the ui for every os
class WindowsUi implements IUIFactory {
  createButton(): IButton {
    return new WindowsButton();
  }
  createCheckbox(): ICheckbox {
    return new WindowsCheckbox();
  }
}
class MacUi implements IUIFactory {
  createButton(): IButton {
    return new MacButton();
  }
  createCheckbox(): ICheckbox {
    return new MacCheckbox();
  }
}

//now the app depends on the interface IUIFactory
// the IUIfactory is responsible for creating the UI elements based on the operating system
// this way we can add new operating systems without changing the existing code
// this allows us to add new operating systems without changing the NewApplication class
class NewApplication {
  private button: IButton;
  private checkBox: ICheckbox;
  private uiFactory: IUIFactory;
  constructor(uiFactory: IUIFactory) {
    this.uiFactory = uiFactory;
    this.button = this.uiFactory.createButton();
    this.checkBox = this.uiFactory.createCheckbox();
  }

  renderUi(): void {
    this.button.render();
    this.checkBox.render();
  }
}

const macUi = new MacUi();
const windowsUi = new WindowsUi();
const macApp = new NewApplication(macUi);
const windowsApp = new NewApplication(windowsUi);
macApp.renderUi();
windowsApp.renderUi();
