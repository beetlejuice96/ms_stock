export abstract class BasePipeServiceAbstract<TValue, TResponse = boolean> {
  protected value: TValue;
  abstract validate(value: TValue): Promise<TResponse>;
  abstract getValue(): TValue;
}
