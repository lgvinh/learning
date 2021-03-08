const pathGenerator = (imageName) => `/images/growth/home/${imageName}`;

export const data = [
  {
    title: 'Understanding your employee',
    content: 'Understanding your employees and how to unleash their potentials is the first step to optimizing the workspace and increasing your KPIs. Don’t try to change your employees, change the environment instead.',
    image: pathGenerator('understanding.png'),
    row: 'normal',
    className: 'growth-problem__understanding'
  },
  {
    title: 'Find strengths to grow',
    content: 'Understanding your employees and how to unleash their potentials is the first step to optimizing the workspace and increasing your KPIs. Don’t try to change your employees, change the environment instead.',
    image: pathGenerator('find.png'),
    row: 'reverse',
    className: 'growth-problem__find'
  },
  {
    title: 'Planning suitable training courses',
    content: 'Find the data you need from your employees to not only analyze who they really but, but to consult them on the perfect training they need. As an employer, your job should not only be hiring and giving task, but also advising and growing with your employees. Only when your human resources are strong and solid, that’s when your company will succeed.',
    image: pathGenerator('planning.png'),
    row: 'normal',
    className: 'growth-problem__planning'
  },
  {
    title: 'Coaching with insights',
    content: 'By finishing the RIASEC and MBTI tests, you can understand more about your employees’ motivation and drive, such as how to improve their productivity and ideal positions. This way, you can both analyze the problems and solve them at the same time.',
    image: pathGenerator('coaching.png'),
    row: 'reverse',
    className: 'growth-problem__coaching'
  }
];
