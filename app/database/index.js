import Realm from 'realm';

const TodoTaskSchema = {
  name: 'TodoTask',
  primaryKey: 'businessKey',
  properties: { 
    businessKey: 'string',
    visited:{
      type: 'bool',
      default: false,
    },
    processDefinitionId: {
      type: 'string',
      optional: true,
    },
    processDefinitionName: {
      type: 'string',
      optional: true,
    },
    processInstanceId: {
      type: 'string',
      optional: true,
    },
    startUserName: {
      type: 'string',
      optional: true,
    },
    subject: {
      type: 'string',
      optional: true,
    },
    taskName: {
      type: 'string',
      optional: true,
    },
    url: {
      type: 'string',
      optional: true,
    },
    createTime: {
      type: 'int',
      optional: true,
    }
  }
};

const TodoTaskDetailsSchema = {
  name: 'TodoTaskDetails',
  properties: {
    businessKey: {
      type: 'string',
    },
    bankAccountAddress:{
      type: 'string',
      optional: true,
    },
    bankAccountName:{
      type: 'string',
      optional: true,
    },
    bankAccountNo:{
      type: 'string',
      optional: true,
    },
    bankName:{
      type: 'string',
      optional: true,
    },
    bcjshyfk:{
      type: 'string',
      optional: true,
    },
    bcjssjzf:{
      type: 'string',
      optional: true,
    },
    bcsqbkje:{
      type: 'string',
      optional: true,
    },
    bcsqzfnr:{
      type: 'string',
      optional: true,
    },
    bcsqzfyj:{
      type: 'string',
      optional: true,
    },
    blj:{
      type: 'string',
      optional: true,
    },
    bz:{
      type: 'string',
      optional: true,
    },
    clk:{
      type: 'string',
      optional: true,
    },
    dksj:{
      type: 'string',
      optional: true,
    },
    dw:{
      type: 'string',
      optional: true,
    },
    invoiceDate:{
      type: 'string',
      optional: true,
    },
    invoiceNo:{
      type: 'string',
      optional: true,
    },
    kkhj:{
      type: 'string',
      optional: true,
    },
    ljfsje:{
      type: 'string',
      optional: true,
    },
    oriPoNo:{
      type: 'string',
      optional: true,
    },
    oriTotalAmt:{
      type: 'string',
      optional: true,
    },
    poName:{
      type: 'string',
      optional: true,
    },
    poNo:{
      type: 'string',
      optional: true,
    },
    projectDesc:{
      type: 'string',
      optional: true,
    },
    qtkk:{
      type: 'string',
      optional: true,
    },
    remark:{
      type: 'string',
      optional: true,
    },
    totalAmt:{
      type: 'string',
      optional: true,
    },
    yfgck:{
      type: 'string',
      optional: true,
    },
  }
}

const TaskHistorySchema = {
  name: 'TaskHistory',
  properties: {
    assignee: { type:'string' },
    comment: { type:'string' },
    endTime: { type:'int' },
    startTime: { type: 'int' },
    taskName: { type: 'string' },
  }
}

const TimeStampSchema = {
  name: 'TimeStamp',
  properties: {
    timeStamp: {
      type: 'date',
    }
  }
}

const TodoTaskListSchema = {
  name: 'TodoTaskList',
  properties: {
    tasks: {
      type:'list', objectType:'TodoTask'
    }
  }
}

 // const PersonSchema={
 //      name:'Person',
 //      properties:{
 //        name:'string',
 //        nickname:'string',
 //        birthday:'date',
 //        picture:{type:'string',optional:true}
 //      }
 //    };

let realm = new Realm({
  schema: [TodoTaskSchema, TodoTaskListSchema, TimeStampSchema, TaskHistorySchema, TodoTaskDetailsSchema],
  schemaVersion: 12,
});  //进行写数据到表中

// const database = new Realm({
//   schema: ['PersonSchema']
// });

export default realm;