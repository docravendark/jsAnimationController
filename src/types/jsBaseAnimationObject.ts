import { vector3, size } from "./datatypes";

export abstract class jsBaseAnimationObject {
  Opacity: number = 1;
  X: number = 0;
  Y: number = 0;
  Z: number = 0;

  W: number = 0;
  H: number = 0;

  RotX: number = 0;
  RotY: number = 0;
  RotZ: number = 0;

  get Location(): vector3 {
    return new vector3(this.X, this.Y, this.Z);
  }
  set Location(value: vector3) {
    this.X = value.X;
    this.Y = value.Y;
    this.Z = value.Z;
  }

  get Rotation(): vector3 {
    return new vector3(this.RotX, this.RotY, this.RotZ); 
  }
  set Rotation(value: vector3) {
    this.RotX = value.X;
    this.RotY = value.Y;
    this.RotZ = value.Z;
  }

  private _size: size = new size(0, 0);
  get Size(): size {
    return this._size;
  }
  set Size(value: size) {
    this._size = value;
  }

  colR: number = 0;
  colG: number = 0;
  colB: number = 0;

  //   public Color Color
  //   {
  //   get
  //   {
  //     return (Color.FromArgb((int)colR, (int)colG, (int)colB));
  //   }
  //   set
  //   {
  //     colR = RgbToDouble(value.R);
  //     colG = RgbToDouble(value.G);
  //     colB = RgbToDouble(value.B);
  //   }
  // }

  //   public static double RgbToDouble(double Rgb)
  // {
  //   return (Rgb / 255d);
  // }

  TextId: number = 0;
  SelectId: number = 0;

  IsHovered: boolean = false;
  IsSelected: boolean = false;

  public abstract OnRenderObject(sender: any, e: any): void;
}