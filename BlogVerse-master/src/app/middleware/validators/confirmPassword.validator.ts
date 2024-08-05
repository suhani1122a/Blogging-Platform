import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidation: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword || !(password === confirmPassword)) {        
        return { passwordMismatch: true };
    }

    return null;
}