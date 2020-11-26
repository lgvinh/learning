import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';


export const Testing = () => {
  return function(object: Object, propertyName: string) {
    console.log("object", object);
    console.log("propertyName", propertyName);
    registerDecorator({
      name: "Tesing",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value instanceof Date)
            return true;
          if (typeof value === 'number' || !isNaN(Date.parse(value))) {
            args.object[propertyName] = new Date(value);
            return true;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return propertyName + ' must be a number or Date';
        }
      }
    });
  };
};
