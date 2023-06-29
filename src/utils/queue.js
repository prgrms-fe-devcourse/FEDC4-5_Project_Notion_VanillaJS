export default class Queue{
  constructor(){
    this.queue = [];
    this.rear = 0;
    this.front = 0;
  }

  enqueue(value){
    this.queue[this.rear++] = value;
  }

  dequeue(){
    const ret = this.queue[this.front];
    delete this.queue[this.front++];
    return ret;
  }

  size(){
    return this.rear - this.front;
  }
}