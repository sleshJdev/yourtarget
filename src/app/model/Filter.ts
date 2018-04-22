export class Filter {
  objectType: ObjectType[];
}

export class ObjectType {
  typeValue: string;
  objectName: string;
  object: Object[];
}

export class Object {
  objectValue: string;
  criteria: Criterion[];
}

export class Criterion {
  criterionName: string;
  criterionValue: string[];
}
