import { Lead, ObjectionData } from '../types';

export const mqlLeads: Lead[] = [
  { id: '1', name: 'Jim Chambers', status: 'Follow-Up', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 320-1897', jobValue: 0, contactDate: new Date('2026-02-02T12:17:00') },
  { id: '2', name: 'Waco Tx', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (254) 301-1736', jobValue: 0, contactDate: new Date('2026-02-02T11:20:00') },
  { id: '3', name: 'Danny Hurtado', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (940) 452-2111', jobValue: 0, contactDate: new Date('2026-02-02T09:19:00') },
  { id: '4', name: 'Danny Hurtado', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (940) 452-2111', jobValue: 0, contactDate: new Date('2026-02-02T09:13:00') },
  { id: '5', name: 'Annette Arroyo', status: 'Not Booked', leadSource: 'Yelp', type: 'Call', contact: '+1 (951) 227-2220', jobValue: 0, contactDate: new Date('2026-01-30T12:45:00'), businessUnit: 'HVAC', objection: 'Customer Hesitation', csrType: 'Live Agent', leadSummary: 'New customer Annette Arroyo called requesting HVAC service for a non-functioning heating unit in a separate casita. The unit is a conventional system (not mini-split) and she\'s unsure if the issue is with the thermostat or unit itself. Danny provided service information including $89 diagnostic fee and offered a Monday afternoon appointment slot. However, Annette declined to book immediately, stating she had other calls out and would call back after comparing options. This represents a qualified lead that did not convert to a booking due to the customer\'s decision to shop around before committing to service.' },
  { id: '6', name: 'Anna Galligan', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 337-7106', jobValue: 0, contactDate: new Date('2026-01-30T10:39:00') },
  { id: '7', name: 'Fort Worth Tx', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 210-1195', jobValue: 0, contactDate: new Date('2026-01-30T09:19:00') },
  { id: '8', name: 'Johnny Moore', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 829-4709', jobValue: 0, contactDate: new Date('2026-01-30T08:37:00') },
  { id: '9', name: 'Josh Jordan', status: 'Unqualified', leadSource: 'Yelp', type: 'Call', contact: '+1 (347) 694-4647', jobValue: 0, contactDate: new Date('2026-01-29T13:37:00') },
  { id: '10', name: 'Josh Jorden', status: 'Unqualified', leadSource: 'Yelp', type: 'Call', contact: '+1 (347) 694-4647', jobValue: 0, contactDate: new Date('2026-01-29T13:36:00') },
  { id: '11', name: 'Arlington Tx', status: 'Missed', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 217-7775', jobValue: 0, contactDate: new Date('2026-01-29T11:24:00') },
  { id: '12', name: 'George Wa', status: 'Unqualified', leadSource: 'Yelp', type: 'Call', contact: '+1 (206) 460-0421', jobValue: 0, contactDate: new Date('2026-01-29T10:21:00') },
  { id: '13', name: 'Victor Attard', status: 'Booked', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 343-2428', jobValue: 0, contactDate: new Date('2026-01-29T07:52:00') },
  { id: '14', name: 'Belle Griffin', status: 'Booked', leadSource: 'Google LSA', type: 'Call', contact: '+1 (512) 962-4749', jobValue: 89, contactDate: new Date('2026-01-28T18:13:00') },
  { id: '15', name: 'Tom Cree', status: 'Unqualified', leadSource: 'Yelp', type: 'Call', contact: '+1 (832) 263-2870', jobValue: 0, contactDate: new Date('2026-01-28T15:57:00') },
  { id: '16', name: 'Wireless Caller', status: 'Follow-Up', leadSource: 'Organic', type: 'Call', contact: '+1 (806) 474-9887', jobValue: 0, contactDate: new Date('2026-01-28T14:17:00') },
  { id: '17', name: 'Betty Stallings', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 219-5575', jobValue: 0, contactDate: new Date('2026-01-28T13:16:00') },
  { id: '18', name: 'Waco Tx', status: 'Unqualified', leadSource: 'Organic', type: 'Call', contact: '+1 (254) 301-1179', jobValue: 0, contactDate: new Date('2026-01-28T12:12:00') },
  { id: '19', name: 'Ty Miller', status: 'Booked', leadSource: 'Organic', type: 'Call', contact: '+1 (817) 271-9474', jobValue: 0, contactDate: new Date('2026-01-28T11:53:00') },
  { id: '20', name: 'Sharon Murphy', status: 'Unqualified', leadSource: 'Google LSA', type: 'Call', contact: '+1 (850) 419-3658', jobValue: 0, contactDate: new Date('2026-01-28T09:54:00') },
];

export const notBookedLeads: Lead[] = [
  { id: 'nb1', name: 'Carl McTeer', status: 'Not Booked', leadSource: 'Google PPC', type: 'Call', contact: '+1 (843) 499-6501', jobValue: 0, contactDate: new Date('2025-12-31T11:14:00'), businessUnit: 'HVAC', objection: 'Quote Request', csrType: 'Live Agent' },
  { id: 'nb2', name: 'Lewis Exavier', status: 'Not Booked', leadSource: 'Yelp', type: 'Call', contact: '+1 (801) 227-7000', jobValue: 0, contactDate: new Date('2025-12-30T18:16:00'), businessUnit: 'HVAC', objection: 'Service Unavailability', csrType: 'AI Agent' },
  { id: 'nb3', name: 'Jason Tremblay', status: 'Not Booked', leadSource: 'Organic', type: 'Call', contact: '+1 (980) 345-0068', jobValue: 0, contactDate: new Date('2025-12-30T10:15:00'), businessUnit: 'HVAC', objection: 'CSR Limitations', csrType: 'Live Agent' },
  { id: 'nb4', name: 'Jerry Fernandez', status: 'Not Booked', leadSource: 'Google LSA', type: 'Call', contact: '+1 (843) 214-7449', jobValue: 0, contactDate: new Date('2025-12-30T09:38:00'), businessUnit: 'HVAC', objection: 'Homeowner Approval', csrType: 'AI Agent' },
  { id: 'nb5', name: 'Sarah Ann', status: 'Not Booked', leadSource: 'Organic', type: 'Call', contact: '+1 (973) 567-9479', jobValue: 0, contactDate: new Date('2025-12-29T11:15:00'), businessUnit: 'HVAC', objection: 'Quote Request', csrType: 'AI Agent' },
];

export const scorecardsMetrics = {
  totalAdSpend: { value: '$776', change: 983 },
  revenueBooked: { value: '$11,556.86', change: 100 },
  revenueMissed: { value: '$3,306', change: 100 },
  avgTicket: { value: '$2,311.00', change: 100 },
  bookingRate: { value: '51%', change: -14 },
  bookedJobs: { value: '22', change: 69 },
  totalQualifiedLeads: { value: '43', change: 95 },
  phoneCallLeads: { value: '42', change: 100 },
  formLeads: { value: '1', change: 0 },
  otherLeads: { value: '0', change: 0 },
  roas: { value: '14.89X', change: 100 },
  cpql: { value: '$18.05', change: 454 },
  cpbl: { value: '$35.27', change: 212 },
};

export const performanceMetrics = {
  totalNotBooked: { value: '26', change: -12 },
  successRate: { value: '76%', change: 8 },
  avgDailyNotBooked: { value: '0.8', change: -5 },
  totalPhoneCalls: { value: '667', change: 15 },
};

export const objectionsOverTime: ObjectionData[] = [
  { week: 'Week 49', 'CSR Limitations': 3, 'Quote Request': 2, 'Connection Issues': 1, 'Scheduling Conflicts': 1, 'Customer Hesitation': 3, 'Homeowner Approval': 1, 'Service Unavailability': 0 },
  { week: 'Week 50', 'CSR Limitations': 2, 'Quote Request': 3, 'Connection Issues': 1, 'Scheduling Conflicts': 2, 'Customer Hesitation': 2, 'Homeowner Approval': 1, 'Service Unavailability': 1 },
  { week: 'Week 51', 'CSR Limitations': 4, 'Quote Request': 4, 'Connection Issues': 2, 'Scheduling Conflicts': 2, 'Customer Hesitation': 3, 'Homeowner Approval': 2, 'Service Unavailability': 0 },
  { week: 'Week 52', 'CSR Limitations': 3, 'Quote Request': 2, 'Connection Issues': 1, 'Scheduling Conflicts': 1, 'Customer Hesitation': 2, 'Homeowner Approval': 1, 'Service Unavailability': 0 },
  { week: 'Week 1', 'CSR Limitations': 2, 'Quote Request': 1, 'Connection Issues': 1, 'Scheduling Conflicts': 1, 'Customer Hesitation': 2, 'Homeowner Approval': 1, 'Service Unavailability': 1 },
];

export const topObjections = [
  { name: 'CSR Limitations', count: 7, color: '#3b82f6' },
  { name: 'Quote Request', count: 6, color: '#f59e0b' },
  { name: 'Connection Issues', count: 3, color: '#4ade80' },
  { name: 'Scheduling Conflicts', count: 3, color: '#ef4444' },
  { name: 'Customer Hesitation', count: 3, color: '#06b6d4' },
  { name: 'Homeowner Approval', count: 2, color: '#8b5cf6' },
];

export const businessUnits = ['HVAC', 'Plumbing', 'Other', 'N/a', 'Undefined'];
