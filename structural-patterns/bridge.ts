//bridge pattern when we have two hierarchies of classes and we want to decouple them
// so that they can evolve independently
//like TVs and Remote Controls
//so every TV has a remote control
// and every remote control can control different TVs
//bad example
// أجهزة تحكم (ريموت كنترول) متعددة لكل جهاز

class TVRemote {
  turnOnTV() {
    console.log("TV turned ON");
  }
  turnOffTV() {
    console.log("TV turned OFF");
  }
}

class RadioRemote {
  turnOnRadio() {
    console.log("Radio turned ON");
  }
  turnOffRadio() {
    console.log("Radio turned OFF");
  }
}

// استخدام الكلاسات

const tvRemote = new TVRemote();
tvRemote.turnOnTV();
tvRemote.turnOffTV();

const radioRemote = new RadioRemote();
radioRemote.turnOnRadio();
radioRemote.turnOffRadio();

// المشكلة هنا هي أن كل جهاز تحكم مرتبط بنوع واحد من الأجهزة.
// إذا أردنا إضافة جهاز جديد، يجب علينا إنشاء جهاز تحكم جديد له.
// الحل هو استخدام نمط الجسر (Bridge Pattern) لفصل واجهة التحكم عن الأجهزة.
// good example

class RemoteControl {
  constructor(private device: IDevice) {}
  powerOn(): void {
    this.device.powerOn();
  }
  powerOff(): void {
    this.device.powerOff();
  }
}

//let's add an Advanced Remote control

class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    console.log("Device muted");
  }
}
interface IDevice {
  powerOn(): void;
  powerOff(): void;
}

class TV implements IDevice {
  powerOn(): void {
    console.log("TV turned ON");
  }
  powerOff(): void {
    console.log("TV turned OFF");
  }
}

const tv = new TV();
const remote = new RemoteControl(tv);
const advancedRemoteControl = new AdvancedRemoteControl(tv);
remote.powerOn(); // TV turned ON
remote.powerOff(); // TV turned OFF
advancedRemoteControl.mute(); // Device muted
