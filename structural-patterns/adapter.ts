//this is a demo for adapter pattern
//the adapter pattern is like an interface for compatibilty between two deiffernet //interfaces
//bad example

class OldPrinter {
  printOldVersion() {
    console.log("Printing from OLD printer...");
  }
}

class PrintManager {
  printUsingOldPrinter(printer: OldPrinter) {
    printer.printOldVersion(); // tightly coupled!
  }
}

//problems
//the printer manager is tightly coupled with the OldPrinter class.
// If we want to use a new printer, we have to modify the PrintManager class.
//so we pass an interface to decouple the creation of the printer from the PrintManager class.
//good example
interface IPrinter {
  print(): void;
}

class GoodePrinterManager {
  constructor(private printer: IPrinter) {
    this.printer = printer;
  }
  print() {
    this.printer.print(); // decoupled!
  }
}
class PrinterAdapter implements IPrinter {
  constructor(private oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  print() {
    this.oldPrinter.printOldVersion(); // adapt the old printer to the new interface
  }
}

const oldPrinter = new OldPrinter();
const printer: IPrinter = new PrinterAdapter(oldPrinter);
const manager = new GoodePrinterManager(printer);
manager.print(); // Printing from OLD printer...
