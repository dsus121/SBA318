// data.js

let feelingsData = [
    { name: 'Anne', feeling: 7, date: '2025-01-01' },
    { name: 'Gilbert', feeling: 5, date: '2025-01-02' },
    { name: 'Diana', feeling: 6, date: '2025-01-03' },
    { name: 'Katherine', feeling: 3, date: '2025-01-04' },
    { name: 'Marilla', feeling: 2, date: '2025-01-05' },
    { name: 'Matthew', feeling: 2, date: '2025-01-06' },
    { name: 'Rachel', feeling: 4, date: '2025-01-07' },   
    { name: 'Ruby', feeling: 4, date: '2025-01-08' },      
    { name: 'Miss Stacy', feeling: 1, date: '2025-01-09' }, 
    { name: 'Josie Pye', feeling: 3, date: '2025-01-10' }    
];

const theQuotes = [
    {character: "Ms. Stacy", feelingNum: 1, quote: "Tomorrow is always fresh with no mistakes in it...well with no mistakes in it yet."},
    {character: "Anne Shirley", feelingNum: 2, quote: "Dear old world … you are very lovely, and I am glad to be alive in you."},
    {character: "Marilla Cuthbert", feelingNum: 3, quote: "Call you Cordelia? Is that your name?"},
    {character: "Anne Shirley", feelingNum: 4, quote: "Next to trying and winning, the best thing is trying and failing."},
    {character: "Gilbert Blythe", feelingNum: 5, quote: "Carrots! Carrots!"},
    {character: "Diana Barry", feelingNum: 6, quote: "I think people make their names nice or ugly just by what they are themselves."},
    {character: "Anne Shirley", feelingNum: 7, quote: "I'm in the depths of despair. Can you eat when you are in the depths of despair?"}
    ];

 const users = [
        { username: 'admin', password: '1876', role: 'admin' },
        { username: 'user1', password: 'one1', role: 'user' },
        { username: 'user2', password: 'two2', role: 'user' },
        { username: 'user3', password: 'three3', role: 'user' }
    ];

    module.exports = { feelingsData, theQuotes, users };