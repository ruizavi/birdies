import { useCallback } from 'react';
import classNames from 'classnames';
import { CLASS_PREFIX } from './const';

export function addPrefix(prefix: string, className: string | string[]) {
   if (!prefix || !className) return '';

   if (Array.isArray(className))
      return classNames(className.filter(name => !!name).map(name => `${prefix}-${name}`));

   return `${prefix}-${className}`;
}

export type ClassValue =
   | string
   | number
   | ClassDictionary
   | ClassArray
   | undefined
   | null
   | boolean;

export interface ClassArray extends Array<ClassValue> {}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface ClassDictionary {
   [id: string]: any;
}

function useClass(str: string) {
   const classPrefix = CLASS_PREFIX;
   const componentClass = addPrefix(classPrefix, str);

   const prefix = useCallback(
      (...classes: ClassValue[]) => {
         const mergeClasses = classes.length
            ? classNames(...classes)
                 .split(' ')
                 .map(item => addPrefix(componentClass, item))
            : [];

         return mergeClasses.join(' ');
      },
      [componentClass]
   );

   const addClassPrefix = useCallback(
      (...classes: ClassValue[]) => {
         const mergeClasses = prefix(classes);

         return mergeClasses ? `${componentClass} ${mergeClasses}` : componentClass;
      },
      [componentClass]
   );

   return {
      prefix,
      merge: classNames,
      addClassPrefix
   };
}

export default useClass;
