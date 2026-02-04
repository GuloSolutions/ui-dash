export interface Lead {
  id: string;
  name: string;
  status: LeadStatus;
  leadSource: LeadSource;
  type: LeadType;
  contact: string;
  jobValue: number;
  contactDate: Date;
  businessUnit?: string;
  objection?: string;
  csrType?: CSRType;
  leadSummary?: string;
  sourceReferenceUrl?: string;
  callDuration?: string;
  callRecordingUrl?: string;
}

export type LeadStatus =
  | 'Follow-Up'
  | 'Missed'
  | 'Not Booked'
  | 'Unqualified'
  | 'New Lead'
  | 'Lost'
  | 'Booked'
  | 'Cancellation';

export type LeadSource = 'Google PPC' | 'Google LSA' | 'Yelp' | 'Organic';

export type LeadType = 'Message' | 'Form' | 'Call' | 'Chat';

export type CSRType = 'AI Agent' | 'Automated System' | 'Live Agent';

export type ObjectionType =
  | 'Customer Hesitation'
  | 'Callback Requested'
  | 'Service Unavailability'
  | 'AI Agent Limitations'
  | 'CSR Limitations'
  | 'Homeowner Approval Required'
  | 'Connection Issues';

export interface MetricCard {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface ObjectionData {
  week: string;
  'CSR Limitations': number;
  'Quote Request': number;
  'Connection Issues': number;
  'Scheduling Conflicts': number;
  'Customer Hesitation': number;
  'Homeowner Approval': number;
  'Service Unavailability': number;
}
