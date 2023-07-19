type Sheet = {
  globals: {
    [global: string]: {
      page: string
      subscriberCount: number
    }
  },
  pages: {
    [page: string]: {
      dependencies?: string[],
      [containers: string]: {
        [widgets: string]: [
          {
            name: string
            display: {
              type: 'string' | 'number' | 'reflection' | 'scale' | 'calculation',
              value: string | {
                outputType: 'string' | 'number',
                //target widget is used for both reflection and scale
                targetWidget?: string,
                scale?: { value: string, output: string }[]
                equation?: string[]
              }
            } 
          }
        ],
        x: number,
        y: number
      }
    }
  }
}
