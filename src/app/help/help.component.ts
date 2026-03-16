import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  searchTerm = '';
  formSubmitted = false;

  // ─── FAQ Data ───
  faqs = [
    {
      question: 'How do I register a new employee?',
      answer: 'Go to Employee Registration from the sidebar, fill in all the required fields and click Submit. The employee will be saved to the database automatically.',
      open: false
    },
    {
      question: 'How do I edit an existing employee?',
      answer: 'Go to the Employee table, find the employee you want to edit and click the EDIT button on their row. The registration form will open with their existing data pre-filled.',
      open: false
    },
    {
      question: 'How do I view an employee profile?',
      answer: 'Go to the Employee table and click anywhere on the employee row (except the Edit/Delete buttons). You will be taken to their full profile page.',
      open: false
    },
    {
      question: 'How do I delete an employee?',
      answer: 'Go to the Employee table and click the DELETE button on the employee row. A confirmation dialog will appear — click OK to permanently delete the record.',
      open: false
    },
    {
      question: 'What happens if I forget my password?',
      answer: 'Click the "Forgot Password?" link on the login page and contact your IT administrator to reset your credentials.',
      open: false
    },
    {
      question: 'Why is the employee table taking long to load?',
      answer: 'The data is fetched from a live Firebase database. A slow internet connection may cause delays. A loading spinner will be shown while data is being fetched.',
      open: false
    },
    {
      question: 'Can I upload a photo for each employee?',
      answer: 'Yes. In the Employee Registration form, paste a public image URL in the Photo URL field. The photo will appear in the employee profile card.',
      open: false
    }
  ];

  // ─── User Guide Steps ───
  guideSteps = [
    {
      step: 1,
      title: 'Login',
      desc: 'Open the app and enter your username and password on the Login page. Click Sign In to access the portal.'
    },
    {
      step: 2,
      title: 'View Dashboard',
      desc: 'After login you are taken to the Dashboard. Here you can see live stats, recent registrations, department breakdown, and search for employees.'
    },
    {
      step: 3,
      title: 'Register an Employee',
      desc: 'Click "Employee Registration" in the sidebar. Fill in the form fields — Name, ID, Designation, Business Unit, Email etc. Click Submit to save.'
    },
    {
      step: 4,
      title: 'View Employee Table',
      desc: 'Click "Employee" in the sidebar to see all registered employees in a table. You can edit or delete any record from here.'
    },
    {
      step: 5,
      title: 'View Employee Profile',
      desc: 'Click any row in the Employee table to open that employee\'s full profile card with all their details and photo.'
    },
    {
      step: 6,
      title: 'Logout',
      desc: 'When done, click the Logout button in the sidebar to securely end your session.'
    }
  ];

  // ─── Keyboard Shortcuts ───
  shortcuts = [
    { keys: 'Alt + H', action: 'Go to Home' },
    { keys: 'Alt + D', action: 'Go to Dashboard' },
    { keys: 'Alt + E', action: 'Go to Employee Table' },
    { keys: 'Alt + R', action: 'Go to Registration Form' },
    { keys: 'Alt + P', action: 'Go to Profile' },
    { keys: 'Alt + L', action: 'Logout' },
  ];

  // ─── Contact Form ───
  contactForm: FormGroup = new FormGroup({
    name:     new FormControl('', Validators.required),
    email:    new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl('', Validators.required),
    message:  new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  get name()     { return this.contactForm.get('name');     }
  get email()    { return this.contactForm.get('email');    }
  get category() { return this.contactForm.get('category'); }
  get message()  { return this.contactForm.get('message');  }

  // ─── Search filter ───
  get filteredFaqs() {
    if (!this.searchTerm.trim()) return this.faqs;
    const term = this.searchTerm.toLowerCase();
    return this.faqs.filter(f =>
      f.question.toLowerCase().includes(term) ||
      f.answer.toLowerCase().includes(term)
    );
  }

  // ─── Toggle FAQ ───
  toggleFaq(index: number) {
    this.filteredFaqs[index].open = !this.filteredFaqs[index].open;
  }

  // ─── Submit contact form ───
  onContactSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;
    this.formSubmitted = true;
    this.contactForm.reset();
  }
}