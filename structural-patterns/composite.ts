//write explanation about composite pattern

// The Composite Pattern is a structural design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies
// It lets clients treat individual objects and compositions of objects uniformly.
//  This pattern is particularly useful when you need to work with a tree structure where both individual objects and groups of objects should be treated the same way.

//explain the concept of leaf composite component
// In the Composite Pattern, there are two main types of components:
// 1. Leaf Components: These are the individual objects that do not have any children. They implement the common interface defined for all components.
// 2. Composite Components: These are the objects that can have children (which can be either leaf components or other composite components). They also implement the same interface and can contain multiple child components.
// This allows you to build complex structures where you can treat both individual objects and groups of objects uniformly.

// Component
interface Graphic {
  draw(): void;
}

// Leaf
class Circle implements Graphic {
  draw() {
    console.log("Draw Circle");
  }
}

class Rectangle implements Graphic {
  draw() {
    console.log("Draw Rectangle");
  }
}

// Composite
class CompositeGraphic implements Graphic {
  private children: Graphic[] = [];

  add(child: Graphic) {
    this.children.push(child);
  }

  remove(child: Graphic) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
  }

  draw() {
    this.children.forEach((child) => child.draw());
  }
}

// الاستخدام
const circle1 = new Circle();
const circle2 = new Circle();
const rectangle = new Rectangle();

const composite = new CompositeGraphic();
composite.add(circle1);
composite.add(rectangle);

const mainComposite = new CompositeGraphic();
mainComposite.add(composite);
mainComposite.add(circle2);

mainComposite.draw();
// النتيجة:
// Draw Circle
// Draw Rectangle
// Draw Circle
