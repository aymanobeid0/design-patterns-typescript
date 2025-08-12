//observer used when we want a subject to notify observer with updates
//it is widely used in event handling systems

//bad example
//high coupling
//every time the temperature changes, we have to manually notify each observer
//which violate the open/closed principle

class WeatherStation {
  private temperature: number = 0;

  public setTemperature(temp: number) {
    console.log(`Temperature updated to ${temp}`);
    this.temperature = temp;
    // إخطار كل الواجهات يدويًا
    screenDisplay.update(temp);
    mobileApp.update(temp);
  }
}

class ScreenDisplay {
  update(temp: number) {
    console.log(`Screen Display: ${temp}°C`);
  }
}

class MobileApp {
  update(temp: number) {
    console.log(`Mobile App: ${temp}°C`);
  }
}

const screenDisplay = new ScreenDisplay();
const mobileApp = new MobileApp();
const weatherStation = new WeatherStation();

weatherStation.setTemperature(25);

//good example
interface IObserver {
  update(temp: number): void;
}

interface Subject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}

class WeatherStationSubject implements Subject {
  private observers: IObserver[] = [];
  private temperature: number = 0; //this is the state that will be changed and the observers will be notified about it
  public subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }
  public setTemperature(temp: number) {
    console.log(`Temperature updated to ${temp}`);
    this.temperature = temp;
    this.notify();
  }
  public unsubscribe(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      console.log("Observer not found in the list.");
    }
    this.observers = this.observers.filter((obs) => obs !== observer);

    console.log(
      `Observer detached. Remaining observers: ${this.observers.length}`
    );
  }
}

class ScreenDisplayObserver implements IObserver {
  update(temp: number): void {
    console.log(`Screen Display: ${temp}°C`);
  }
}

class MobileAppObserver implements IObserver {
  update(temp: number): void {
    console.log(`Mobile App: ${temp}°C`);
  }
}

const weatherStationSubject = new WeatherStationSubject();
const screenDisplayObserver = new ScreenDisplayObserver();
const mobileAppObserver = new MobileAppObserver();
weatherStationSubject.subscribe(screenDisplayObserver);
weatherStationSubject.subscribe(mobileAppObserver);

weatherStationSubject.setTemperature(30);
weatherStationSubject.unsubscribe(screenDisplayObserver);
weatherStationSubject.unsubscribe(mobileAppObserver);
