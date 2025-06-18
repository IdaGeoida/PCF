export enum Applicability { MZ='MZ', WP='WP', NZ='NZ' }
export interface Process { id:number; name:string; category_id:number; applicability:Applicability }
export interface ScoreInput { process_id:number; level_general:number; level_detailed:number; level_extension?:number }
