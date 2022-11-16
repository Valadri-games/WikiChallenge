export default class SaeGenerator {
    private static _instance: SaeGenerator;

    public static getInstance(): SaeGenerator {
        if(!SaeGenerator._instance) SaeGenerator._instance = new SaeGenerator();
        return SaeGenerator._instance;
    }

    private start: string;
    private end: string;

    constructor() {
        this.start = "";
        this.end = "";
    }

    public async generateNew(params: NewSaEParams): Promise<GenerationNewResult> {
        let result: GenerationNewResult = {
            success: false,
        };

        let response = await this.requestApi("https://fr.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2");
        if(!response.success) {
            // ----> Do something when request fail
            return result;
        }

        result.success = true;
        if(params.start) { 
            this.start = response.result.random[0].title;
            result.start = this.start;
        }
        if(params.end) {
            this.end = response.result.random[1].title;
            result.end = this.end;
        }

        return result;
    }

    private async requestApi(url: string): Promise<RequestApiResponse> {
        return await new Promise((resolve) => {
            //@ts-ignore
            $.ajax({url: url,
                dataType: "jsonp",

                success: (response: any) => {
                    resolve({
                        success: true,
                        result: response.query,
                    });
                },

                error: () => { resolve({success: false}); }
            });

            setTimeout(resolve, 3000, {success: false});
        });
    }

    get startPage(): string {
        return this.start;
    }

    get endPage(): string {
        return this.end;
    }
}

interface NewSaEParams {
    lang: string,
    start?: boolean,
    end?: boolean,
}

interface RequestApiResponse {
    success: boolean,
    result?: any,
}

interface GenerationNewResult {
    success: boolean,
    start?: string,
    end?: string,
}