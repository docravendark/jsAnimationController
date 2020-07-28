
export class point {
  X: number = 0;
  Y: number = 0;

  public constructor(X: number,Y: number) {
    this.X = X;
    this.Y = Y;
  }
}

export class size {
  W: number = 0;
  H: number = 0;

  public constructor(W: number,H: number) {
    this.W = W;
    this.H = H;
  }
}

export class rect {
  X: number = 0;
  Y: number = 0;
  W: number = 0;
  H: number = 0;

  public constructor(X: number,Y: number, W: number,H: number) {
    this.X = X;
    this.Y = Y;
    this.W = W;
    this.H = H;
  }
}

export class vector3 {
  X: number = 0;
  Y: number = 0;
  Z: number = 0;

  public constructor(X: number, Y: number, Z: number) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }

  public add(toAdd: vector3): vector3 {
    return new vector3(this.X + toAdd.X, this.Y + toAdd.Y, this.Z + toAdd.Z);
  }

  static get empty(): vector3 {
    return new vector3(0, 0, 0);
  }
}