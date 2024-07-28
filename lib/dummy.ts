import { Member } from '@/types/Member'
import { Study, StudyRecord } from '@/types/Study'

const memberDict: { [key: string]: Member } = {
  박태곤: {
    id: '1',
    name: '박태곤',
    description:
      '안녕하세요~ 코밋 회장 박태곤입니다! 코밋에 대해 문의하고 싶다면 자유롭게 연락해주세요!',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/37403351-4da2-4d38-88ee-368defbfb2b2',
    position: '회장',
    displayAtAboutPage: true
  },
  박상혁: {
    id: '2',
    name: '박상혁',
    description:
      '안녕하세요! 코밋 부회장 박상혁입니다. 비전공자에서 Be전공자가 될 수 있도록 최선을 다하겠습니다.',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/4ce7e085-2967-4897-9484-b6bf0988d26a',
    position: '부회장',
    displayAtAboutPage: true
  },
  이주형: {
    id: '3',
    name: '이주형',
    description:
      '화학과 소프트웨어학과를 전공중인 기획팀장 이주형이라고 합니다!',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/18a0ba19-9689-444a-9b10-8e12577c9717',
    position: '기획팀장',
    displayAtAboutPage: true
  },
  박지현: {
    id: '4',
    name: '박지현',
    description: '안녕하세요 소비자학과 전공중인 홍보팀장 박지현입니다!',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/a0cd7229-9f86-4d39-b529-7c41ffffd330',
    position: '홍보팀장',
    displayAtAboutPage: true
  },
  이건주: {
    id: '5',
    name: '이건주',
    description:
      '수학과/데이터사이언스 복수전공 중인 이건주입니다. 데이터 분석 및 의료 인공지능 관련 연구에 관심이 있습니다.',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/af8e58f0-f6bf-4bbe-9423-0f7c62ba4e47',
    position: '인사팀장',
    displayAtAboutPage: true
  },
  김성중: {
    id: '6',
    name: '김성중',
    description:
      '소프트웨어를 전공하고 있는 김성중입니다. 앱개발 및 시스템보안에 관심이 있습니다.',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/452f4f2a-6090-4400-bb64-20580aa0841e',
    position: '재무팀장',
    displayAtAboutPage: true
  },
  권서진: {
    id: '7',
    name: '권서진',
    description:
      '안녕하세요! 코딩 잘하고 싶은 권서진입니다. 코밋에 가장 많이 커밋하는 것을 목표로 열심히 달려보겠습니다.',
    imageUrl:
      'https://github.com/skku-comit/comit-website/assets/97675977/44136781-209a-4356-8434-2c645f408aef',
    position: '개발팀장',
    displayAtAboutPage: true
  },
  'Udemy 공통': {
    id: '8',
    name: 'Udemy 공통',
    description: '',
    imageUrl:
      'https://w7.pngwing.com/pngs/299/56/png-transparent-udemy-logo-thumbnail-tech-companies-thumbnail.png',
    position: '',
    displayAtAboutPage: false
  },
  박지은: {
    id: '9',
    name: '박지은',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  정정환: {
    id: '10',
    name: '정정환',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  문준원: {
    id: '11',
    name: '문준원',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  김지훈: {
    id: '12',
    name: '김지훈',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  김지헌: {
    id: '13',
    name: '김지헌',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  한승현: {
    id: '14',
    name: '한승현',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  김남준: {
    id: '15',
    name: '김남준',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  박지환: {
    id: '16',
    name: '박지환',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  },
  조준형: {
    id: '17',
    name: '조준형',
    description: '',
    imageUrl: '',
    position: '',
    displayAtAboutPage: false
  }
}

const studyDict: { [key: string]: Study } = {
  '웹 개발 초급': {
    id: '1',
    imageSrc:
      'https://p92.hu/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png',
    title: '웹 개발 초급',
    mentor: memberDict['Udemy 공통'],
    day: '',
    startTime: '',
    endTime: '',
    level: '초급',
    stack: ['HTML', 'CSS', 'JavaScript'],
    campus: '공통',
    description:
      'Udemy의 Web 부트캠프 강의를 기반으로 초급 html/css부터 javascript 문법 공부를 통해 자신만의 랜딩 페이지를 만드는 것이 목표입니다. 웹개발에 관심이 있으며 처음 접해보는 분들에게 권장됩니다.',
    isRecruiting: false
  },
  'Python 데이터 분석': {
    id: '2',
    imageSrc:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    title: 'Python 데이터 분석',
    mentor: memberDict['Udemy 공통'],
    day: '',
    startTime: '',
    endTime: '',
    level: '중급',
    stack: ['Python', 'Apache'],
    campus: '공통',
    description:
      'Udemy의 파이썬 데이터분석 부트캠프 강의를 기반으로 기본 파이썬 문법을 정리해보고, 다양한 데이터분석 모듈과 기술의 사용법을 공부해 보는 것이 목표입니다. 초반에 파이썬 문법을 정리하는 섹션이 있지만, 조금은 파이썬 문법에 지식이 있는 분들에게 권장됩니다',
    isRecruiting: false
  },
  'C언어 초급1': {
    id: '3',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    title: 'C언어 초급',
    mentor: memberDict['Udemy 공통'],
    day: '',
    startTime: '',
    endTime: '',
    level: '초급',
    stack: ['C'],
    campus: '공통',
    description:
      'Udemy의 c언어 부트캠프 강의를 기반으로 개발환경 세팅과 c언어의 초급 문법부터 공부하여 학기말에 간단한 자유 프로젝트를 제작하는 것이 목표입니다. 프로그래밍이나 c에 대해 지식이 없는 분들에기 권장드립니다.',
    isRecruiting: false
  },
  '백엔드 node.js': {
    id: '4',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    title: '백엔드 node.js',
    mentor: memberDict['박지은'],
    day: '금',
    startTime: '19:30',
    endTime: '21:00',
    level: '중급',
    stack: ['Node.js', 'Express', 'TypeScript'],
    campus: '율전',
    description:
      'Udemy 강의 [NodeJS - The Complete Guide] 를 들으면서 Node, Express, Typescript를 학습하는 스터디입니다. Javascript에 능숙하고 웹 동작 원리에 대한 이해가 있는 분들께 권장드립니다. 세부적인 스터디 진행 방식은 모집 후 토의를 통해 결정할 예정입니다. 강의 런타임이 38.5시간으로 긴 편인데 학기 중에 시간 투자해서 같이 완강까지 달릴 분들 신청해주세요!\n\n<a href="https://www.udemy.com/course/nodejs-the-complete-guide/" target="_blank" style="color: blue">[유데미 강의 링크]</a>',
    isRecruiting: false
  },
  'Unity C# 게임 개발': {
    id: '5',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original-wordmark.svg',
    title: 'Unity C# 게임 개발',
    mentor: memberDict['박태곤'],
    day: '수',
    startTime: '19:30',
    endTime: '21:30',
    level: '초중급',
    stack: ['Unity', 'C#'],
    campus: '율전',
    description:
      'Udemy의 C#강의와 Unity 2d게임 개발 강의를 기반으로 C#문법을 몇주동안 빠르게 공부한 뒤, 유니티 엔진 공부로 넘어가 학기말에 공동 게임 프로젝트를 하나 만드는 것이 목표입니다. unity엔진이 큰 개발 능력을 요구하지는 않기에 초보거나 게임 개발에 관심있으신분들이라면 환영입니다. 다만 c#을 다루기에 어느정도 c언어를 다룰 수 있는 분들에게 권장됩니다.',
    isRecruiting: false
  },
  'Kotlin & Android app': {
    id: '6',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    title: 'Kotlin & Android app',
    mentor: memberDict['정정환'],
    day: '화',
    startTime: '16:00',
    endTime: '17:30',
    level: '초중급',
    stack: ['Kotlin', 'Android'],
    campus: '율전',
    description:
      '공식문서를 기반으로 모두가 스터디 동안 각자 하나의 앱을 만들고 배포하는 것을 목표로 스터디를 진행합니다. 매주마다 배운 내용을 적용하여 progress를 발표하고, 서로 피드백하는 과정이 주가 됩니다. 개발경험이 없어도 괜찮지만, 기본적인 알고리즘, 프론트/백엔드,git 등에 대한 지식은 스스로 학습하며 따라오실 수 있는 분들에게 권장됩니다.',
    isRecruiting: false
  },
  알고리즘1: {
    id: '7',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thealgorithms/thealgorithms-plain-wordmark.svg',
    title: '알고리즘',
    mentor: memberDict['문준원'],
    day: '월',
    startTime: '',
    endTime: '',
    level: '초급',
    stack: ['알고리즘', 'C'],
    campus: '율전',
    description:
      '백준사이트를 통해 알고리즘 문제풀이 오프라인 스터디를 진행합니다. c언어의 기본문법을 배우신분들을 대상으로 진행하며 제일낮은단계인 새싹문제들과 클래스1단계 문제들부터 진행합니다. 매주 진행 예정이며 시간대및 세부사항은 모집후 정할예정입니다.',
    isRecruiting: false
  },
  '백엔드 spring': {
    id: '8',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg',
    title: '백엔드 spring',
    mentor: memberDict['김지훈'],
    day: '화',
    startTime: '19:30',
    endTime: '21:00',
    level: '초중급',
    stack: ['Spring', 'Git'],
    campus: '율전',
    description:
      'Udemy 강의 [Spring Boot3 & Spring Framework 6 마스터하기!]를 들으면서 spring의 기초부터 학습할 계획입니다. 추가로 필요한 개념이 있다면 온라인 자료를 활용하여 학습할 계획입니다. 주마다 공부한 내용을 공유하고 Git을 활용하여 작은 웹 사이트를 만드는 프로젝트를 기획 중에 있습니다. (세부 계획은 토의를 통해 결정해요!) / 부가적으로 필요한 JAVA, Git, 백엔드와 프론트엔드 기초 지식 등은 미리 학습되어 있으신 분들이 신청하시면 좋을 것 같습니다 :)\n\n공통 공강시간으로 조정 가능\n\n<a href="https://www.udemy.com/course/spring-boot-and-spring-framework-korean/" target="_blank" style="color: blue">[유데미 강의 링크]</a>',
    isRecruiting: false
  },
  알고리즘2: {
    id: '9',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thealgorithms/thealgorithms-original-wordmark.svg',
    title: '알고리즘',
    mentor: memberDict['김지헌'],
    day: '목',
    startTime: '',
    endTime: '',
    level: '초급',
    stack: ['알고리즘', 'Python'],
    campus: '명륜',
    description:
      '유데미 "알고리즘 코딩 테스트 입문부터 합격까지" 특강을 같이 들으면서 python 알고리즘 기초를 같이 배우고, 백준 문제도 같이 풀어볼 예정입니다. 수준 및 인원, 여건에 따라 유동적으로 운영할 계획입니다.\n\n<a href="https://url.kr/jodhyx/" target="_blank" style="color: blue">[유데미 강의 링크]</a>',
    isRecruiting: false
  },
  '자바스크립트와 node.js': {
    id: '10',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
    title: '자바스크립트와 node.js',
    mentor: memberDict['한승현'],
    day: '월',
    startTime: '',
    endTime: '',
    level: '초급',
    stack: ['Node.js', 'JavaScript'],
    campus: '율전',
    description:
      '여러 온라인 자료를 활용하여 먼저 자바스크립트에 대해 학습하고, 실습합니다. 그 후 node.js의 기초를 학습하고, 간단한 백엔드를 구축해보는 활동을 할 예정입니다. (세부계획과 일정은 모집 후 정할 예정입니다)',
    isRecruiting: false
  },
  '웹 프론트엔드': {
    id: '11',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg',
    title: '웹 프론트엔드',
    mentor: memberDict['권서진'],
    day: '월',
    startTime: '19:30',
    endTime: '21:00',
    level: '중급',
    stack: ['React', 'TypeScript', 'Tailwind', 'Git'],
    campus: '율전',
    description:
      '공식문서와 각종 온라인 자료들을 활용하여 React, Typescript, Tailwind를 학습하고 실습합니다. 주마다 Git Issue에 공부해야 할 내용과 실습을 올릴 예정입니다. 오프라인으로 만나서는 서로 코드를 리뷰하고 공부한 내용을 공유합니다. HTML, CSS, JS에 대한 사전지식이 있으면서 Git으로 commit, push 해보신 분들 대상으로 진행합니다.',
    isRecruiting: false
  },
  알고리즘: {
    id: '12',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spack/spack-original.svg',
    title: '알고리즘',
    mentor: memberDict['박상혁'],
    day: '월',
    startTime: '20:00',
    endTime: '21:30',
    level: '중급',
    stack: ['알고리즘', '자료구조'],
    campus: '율전',
    description:
      '백준 등의 온라인 저지 사이트에 있는 다양한 문제들을 통해 자료구조와 알고리즘을 적용하는 연습을 하는 스터디입니다. 풀 문제들을 정해서 일주일 동안 각자 고민하고 해결할 시간을 가진 다음 스터디 시간에 풀이 방법 등을 공유하는 방식으로 진행할 예정입니다. 기본적으로 자료구조와 알고리즘을 어느 정도 알고 있는 분들께 권장드립니다.',
    isRecruiting: false
  },
  'C언어 초급2': {
    id: '13',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-plain.svg',
    title: 'C언어 초급',
    mentor: memberDict['김남준'],
    day: '수',
    startTime: '13:30',
    endTime: '15:00',
    level: '초급',
    stack: ['C'],
    campus: '명륜',
    description:
      '하버드 기초 cs강좌 cs50 한글 번역 강의와 Udemy의 c언어 강의를 기반으로 자료구조 공부를 목표로 한다. 백준 실버 1을 목표로 하며 파이썬은 거의 안다고 가정한다.',
    isRecruiting: false
  },
  'AWS Developer Associate': {
    id: '14',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    title: 'AWS Developer Associate',
    mentor: memberDict['박지환'],
    day: '월',
    startTime: '21:00',
    endTime: '22:00',
    level: '상급',
    stack: ['AWS'],
    campus: '온라인',
    description:
      '스터디 목표:\n* AWS Certified Developer Associate 자격증 취득 (~2024.07).\n* AWS 서비스에 대한 이해와 활용 능력 향상.\n스터디 대상:\n* AWS 클라우드 서비스를 최소 3개 이상 사용해보신 분 혹은 기타 AWS 자격증 보유자.',
    isRecruiting: false
  },
  코테준비반: {
    id: '15',
    imageSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/readthedocs/readthedocs-original.svg',
    title: '코테준비반',
    mentor: memberDict['조준형'],
    day: '화',
    startTime: '20:00',
    endTime: '21:30',
    level: '중급',
    stack: ['PS', '알고리즘'],
    campus: '온라인',
    description:
      '코딩테스트를 준비하여 꾸준히 일정량의 문제를 푸는 것을 목적으로 합니다. 효율을 위해 개념에 대한 공부는 각자 하도록 하며,  각자의 난이도와 수준에 맞게 문제를 풀고 인증을 하는 방식으로 이루어집니다. 지금 당장 코딩테스트를 위해 준비를 하시는 분들, 꾸준한 문제풀이를 원하시는 분들에게 추천드립니다.',
    isRecruiting: false
  }
}

const studyRecordDict: StudyRecord[] = [
  {
    id: '1',
    study: studyDict['웹 개발 초급'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '2',
    study: studyDict['Python 데이터 분석'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '3',
    study: studyDict['C언어 초급1'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '4',
    study: studyDict['백엔드 node.js'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '5',
    study: studyDict['Unity C# 게임 개발'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '6',
    study: studyDict['알고리즘1'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '7',
    study: studyDict['백엔드 spring'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '8',
    study: studyDict['알고리즘2'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  },
  {
    id: '9',
    study: studyDict['자바스크립트와 node.js'],
    createDate: new Date('2024-02-16 22:29'),
    status: 'opened'
  }
]

export const dummyStackUrl: string[] = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg'
]

const members = Object.values(memberDict)
const studies = Object.values(studyDict)
const studyRecords = Object.values(studyRecordDict)

export { members, studies, studyRecords }
