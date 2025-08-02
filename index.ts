class Logger {
  private constructor() {}

  private static instance: Logger;
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

class UserSessionManager {
  private constructor() {}
  private currentUser: string | null = null;
  private static instance: UserSessionManager;
  public static getInstance(): UserSessionManager {
    if (!UserSessionManager.instance) {
      UserSessionManager.instance = new UserSessionManager();
    }
    return UserSessionManager.instance;
  }

  public login(userName: string): void {
    this.currentUser = userName;
    console.log(`User ${userName} logged in`);
  }
  public logout(): void {
    if (!this.currentUser) {
      console.log("No user is currently logged in");
      return;
    }
    console.log(`User ${this.currentUser} logged out`);
    this.currentUser = null;
  }
  public getCurrentUser(): string | null {
    return this.currentUser;
  }
}

const userSessionManager1 = UserSessionManager.getInstance();

userSessionManager1.login("Alice");
console.log(userSessionManager1.getCurrentUser());
userSessionManager1.logout();
userSessionManager1.login("Bob");
console.log(userSessionManager1.getCurrentUser());
userSessionManager1.logout();
userSessionManager1.logout();

// // في أماكن مختلفة من النظام:
// const logger1 = Logger.getInstance();
// logger1.log("User signed up");

// const logger2 = Logger.getInstance();
// logger2.log("Course created");

// console.log(logger1 === logger2); // false
