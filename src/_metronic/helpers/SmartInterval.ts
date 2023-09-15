type AsyncFunction = () => Promise<void>

export default class SmartInterval {
  private asyncFn: AsyncFunction
  private delayMs: number
  private running: boolean

  constructor(asyncFn: AsyncFunction, delayMs: number) {
    this.asyncFn = asyncFn
    this.delayMs = delayMs
    this.running = false
  }

  private async cycle(forced?: boolean): Promise<void> {
    await this.asyncFn()
    await this.delay(this.delayMs)
    if (!forced && this.running) {
      this.cycle()
    }
  }

  public start(): void {
    if (this.running) return
    this.running = true
    this.cycle()
  }

  public stop(): void {
    if (this.running) {
      this.running = false
    }
  }

  public forceExecution(): void {
    if (this.running) {
      this.cycle(true)
    }
  }

  private delay(ms: number): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(1), ms))
  }
}
