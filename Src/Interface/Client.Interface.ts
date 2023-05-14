export interface IClientInterface {
    client: string;
    dietitian: string;
    goal: string;
    name: string;
    age: number;
    gender: string;
    activityLevel: string;
    height: number;
    weight: number;
    medicalConditions?: string[];
    allergies?: string[];
  }
  