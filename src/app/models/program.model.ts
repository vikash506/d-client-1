export class Program {

    constructor(
        public mission_id: string[],
        public flight_number: number,
        public mission_name: string,
        public launch_year: string,
        public launch_success: boolean,
        public land_success: boolean,
        public mission_patch_small: string
    ) { }

}