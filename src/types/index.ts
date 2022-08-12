export interface DogInfo {
    id?: string;
    name: string;
    life_span: string;
    temperament: string;
    image: {
      url: string;
    };
  }

export interface LoadingOption {
  color: string;
  type: string;
  width: number;
  height: number;
}