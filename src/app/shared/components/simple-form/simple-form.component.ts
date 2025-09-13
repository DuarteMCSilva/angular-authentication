import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-simple-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './simple-form.component.html',
  styleUrl: './simple-form.component.css'
})
export class SimpleFormComponent {

  @Input() formTitle: string = 'Form Title';
  @Input() formFields: { label: string, type: string, name: string, required?: boolean }[] = [];
  @Input() formSubmitText: string = 'Submit';
  @Input() toggleLink?: { text: string, url: string };
  @Input() errorMessage?: string;

  @Output() onLinkClick = new EventEmitter<void>();
  @Output() onFormSubmit = new EventEmitter<any>();
  @Output() onFormChanges = new EventEmitter<any>();

  public form: FormGroup;
  public showError: boolean = false;

  public subscriptions: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({});
  }
  
  ngOnInit() {
    const subscribeToForm = this.form.valueChanges.subscribe(() => {
      this.onFormChanges.emit(this.form);
    });
    this.subscriptions.push(subscribeToForm);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if(simpleChanges['formFields']) {
      const controls: any = {};
      this.formFields.forEach(field => (controls[field.name] = ['']));
      this.form = this.formBuilder.group(controls);
    }
    if(simpleChanges['errorMessage']) {
      this.showError = !!this.errorMessage;
    }
  }

  onFooterLinkClick() {
    this.onLinkClick.emit();
  }

  onSubmit() {
    this.onFormSubmit.emit(this.form);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
