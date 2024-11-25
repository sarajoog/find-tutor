import { animate, state, style, transition, trigger } from '@angular/animations';

export const buttonAnimation = trigger('buttonAnimation', [
  state('idle', style({
    transform: 'scale(1)',
    opacity: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  })),
  state('hover', style({
    transform: 'scale(1.05)',
    opacity: 0.95,
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  })),
  state('active', style({
    transform: 'scale(0.98)',
    opacity: 1,
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  })),
  transition('idle => hover', [
    animate('150ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
  transition('hover => idle', [
    animate('100ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
  transition('* => active', [
    animate('80ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
  transition('active => *', [
    animate('150ms cubic-bezier(0.4, 0, 0.2, 1)')
  ])
]); 