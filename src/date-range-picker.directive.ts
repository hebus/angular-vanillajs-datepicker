import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import DateRangePicker from 'vanillajs-datepicker/DateRangePicker';

@Directive({
  selector: '[daterangepicker]',
})
export class DateRangePickerDirective {
  destroyRef = inject(DestroyRef);

  title = input<string | undefined>(undefined, { alias: 'datepicker-title' });
  autoHide = input(false, {
    transform: booleanAttribute,
    alias: 'datepicker-autohide',
  });
  clearButton = input(false, {
    transform: booleanAttribute,
    alias: 'datepicker-clear',
  });
  todayButton = input(false, {
    transform: booleanAttribute,
    alias: 'datepicker-today',
  });
  buttons = input(false, {
    transform: booleanAttribute,
    alias: 'datepicker-buttons',
  });
  todayHighlight = input(false, {
    transform: booleanAttribute,
    alias: 'datepicker-today-highlight',
  });
  language = input<string | undefined>(undefined, {
    alias: 'datepicker-language',
  });
  format = input<string | undefined>(undefined, { alias: 'datepicker-format' });

  el = inject(ElementRef);
  datepicker?: DateRangePicker;

  constructor() {
    afterNextRender(() => {
      this.datepicker = new DateRangePicker(this.el.nativeElement, {
        format: this.format(),
        clearButton: this.buttons() || this.clearButton(),
        todayButton: this.buttons() || this.todayButton(),
        todayHighlight: this.todayHighlight(),
        autohide: this.autoHide(),
        language: this.language(),
        title: this.title(),
        prevArrow: `<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path></svg>`,
        nextArrow: `<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path></svg>`,
      });
    });

    this.destroyRef.onDestroy(() => {
      this.datepicker?.destroy();
    });
  }
}
