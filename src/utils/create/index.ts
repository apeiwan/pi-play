import { createBEM, BEM } from './bem';
import { createComponent } from './component';

const Namespace = 'pi-play';

type CreateNamespaceReturn = [
  ReturnType<typeof createComponent>,
  BEM
];

export function createNamespace(name: string): CreateNamespaceReturn {
  name = `${Namespace}-${name}`;
  return [createComponent(name), createBEM(name)];
}

export function createNamespaceStr(name: string) {
  name = `${Namespace}-${name}`;
  return { name };
}
