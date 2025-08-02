// عدّل هذا التصميم بحيث تستخدم Factory لإنشاء النوع المناسب من المستخدم (Student, Teacher) بدل التحقق اليدوي من role.

// كل نوع يجب أن يكون له دالة access() تطبع ما إذا كان له صلاحية دخول أم لا.

abstract class User {
  role: string;
  constructor(role: string) {
    this.role = role;
  }

  abstract access(): void;
}

interface IStudent {
  enrollCourse(name: string): void;
  listCourses(): string[];
}
interface ITeacher {
  assignCourse(name: string): void;
  listCourses(): string[];
}

class Student extends User implements IStudent {
  private enrolledCourses: string[] = [];
  constructor() {
    super("student");
  }

  enrollCourse(name: string): void {
    this.enrolledCourses.push(name);
  }

  listCourses(): string[] {
    return this.enrolledCourses;
  }

  access(): void {
    console.log("Student access granted");
  }
}

class Teacher extends User implements ITeacher {
  assignedCourses: string[] = [];
  constructor() {
    super("teacher");
  }

  assignCourse(name: string): void {
    this.assignedCourses.push(name);
  }
  listCourses(): string[] {
    return this.assignedCourses;
  }
  access(): void {
    console.log("Teacher access granted");
  }
}

class UserFactory {
  static createUser(role: string): User {
    if (role === "student") {
      return new Student();
    } else if (role === "teacher") {
      return new Teacher();
    } else {
      throw new Error("Invalid role");
    }
  }
}

const student = UserFactory.createUser("student") as Student;
const teacher = UserFactory.createUser("teacher") as Teacher;
student.enrollCourse("Math 101");
student.enrollCourse("History 201");
teacher.assignCourse("Physics 101");
student
  .listCourses()
  .forEach((course) => console.log(`Student enrolled in: ${course}`));
