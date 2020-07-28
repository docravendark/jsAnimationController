export class jsAnimationEvents<T> {
  eventName: string;
  eventAction: Array<Function>;

  constructor(name: string) {
    this.eventName = name;
    this.eventAction = new Array<Function>();
  }

  subscribe(functionToCall: Function) {
    this.eventAction.push(functionToCall);
  }

  unsubscribe(functionToCall: Function) {
    this.eventAction.splice(this.eventAction.indexOf(functionToCall), 1);
  }

  fire(sender: any, eventArgs: T) {
    for (let evntCount = 0; evntCount < this.eventAction.length; evntCount++) {
      const element = this.eventAction[evntCount];
      if (element != null) {
        element(sender, eventArgs);
      }
    }
  }
}

export class startAnimationEventArgs {
}

export class stopAnimationEventArgs {
}