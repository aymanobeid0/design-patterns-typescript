//builder pattern used to create objects by steps
//we use the final object
//a builder is a class that constructs a complex object step by step
// director wich will build the final object

//bad example
//every time i should add new report i should modify the code
//in creation process i could miss or forget something
class SimpleReport {
  content: string = "";
  header: string = "";
  footer: string = "";

  generateReport(type: "PDF" | "HTML") {
    if (type === "PDF") {
      this.header = "PDF Header";
      this.content = "PDF Content";
      this.footer = "PDF Footer";
    } else if (type === "HTML") {
      this.header = "<h1>HTML Header</h1>";
      this.content = "<p>HTML Content</p>";
      this.footer = "<footer>HTML Footer</footer>";
    }
  }

  show() {
    console.log(this.header + "\n" + this.content + "\n" + this.footer);
  }
}

//good example

class SimpleReport2 {
  private header = "";
  private content = "";
  private footer = "";

  setHeader(header: string) {
    this.header = header;
  }

  setFooter(footer: string) {
    this.footer = footer;
  }
  setContent(content: string) {
    this.content = content;
  }

  showReport() {
    console.log(this.header + "\n" + this.content + "\n" + this.footer);
  }
}

interface IReportBuilder {
  setHeader(): void;
  setContent(): void;
  setFooter(): void;
  getReport(): SimpleReport2;
}

class PdfReportBuilder implements IReportBuilder {
  private report = new SimpleReport2();
  setHeader(): void {
    this.report.setHeader(`PDF Header:`);
  }
  setContent(): void {
    this.report.setContent(`PDF Content: This is a sample PDF report content.`);
  }
  setFooter(): void {
    this.report.setFooter(`PDF Footer: This is the footer of the PDF report.`);
  }
  getReport(): SimpleReport2 {
    return this.report;
  }
}

class Reporter {
  constructor(private reportBuilder: IReportBuilder) {}

  generateReport() {
    this.reportBuilder.setHeader();
    this.reportBuilder.setContent();
    this.reportBuilder.setFooter();
  }
}

//now we will build with fluent builder interface
//no need for director class

class FluentPdfBuilder {
  private report = new SimpleReport2();

  setHeader(header: string): FluentPdfBuilder {
    this.report.setHeader(header);
    return this;
  }

  setContent(content: string): FluentPdfBuilder {
    this.report.setContent(content);
    return this;
  }

  setFooter(footer: string): FluentPdfBuilder {
    this.report.setFooter(footer);
    return this;
  }

  build(): SimpleReport2 {
    return this.report;
  }
}

const pdfReportBuilder = new PdfReportBuilder();
const reporter = new Reporter(pdfReportBuilder);
reporter.generateReport();
const report = pdfReportBuilder.getReport();
report.showReport();

//fluent builder interface usage

const pdfReportBuilderFluent = new FluentPdfBuilder();
const reportFluent = pdfReportBuilderFluent
  .setHeader("Fluent PDF Header")
  .setContent("Fluent PDF Content")
  .setFooter("Fluent PDF Footer")
  .build();

reportFluent.showReport();
