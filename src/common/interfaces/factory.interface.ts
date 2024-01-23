export interface FactoryInterface<TObjectResponse = any> {
  create: (...params: any[]) => TObjectResponse | never;
}
