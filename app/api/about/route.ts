import { NextResponse } from 'next/server'

interface Member {
  name: string
  description: string
  imageUrl: string
  position: string
}

export async function GET() {
  const data: Member[] = [
    {
      name: '박태곤',
      description:
        '안녕하세요~ 코밋 회장 박태곤입니다! 코밋에 대해 문의하고 싶다면 자유롭게 연락해주세요!',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/37403351-4da2-4d38-88ee-368defbfb2b2',
      position: '회장'
    },
    {
      name: '박상혁',
      description:
        '안녕하세요! 코밋 부회장 박상혁입니다. 비전공자에서 Be전공자가 될 수 있도록 최선을 다하겠습니다.',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/4ce7e085-2967-4897-9484-b6bf0988d26a',
      position: '부회장'
    },
    {
      name: '이주형',
      description:
        '화학과 소프트웨어학과를 전공중인 기획팀장 이주형이라고 합니다!',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/18a0ba19-9689-444a-9b10-8e12577c9717',
      position: '기획팀장'
    },
    {
      name: '박지현',
      description: '안녕하세요 소비자학과 전공중인 홍보팀장 박지현입니다!',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/a0cd7229-9f86-4d39-b529-7c41ffffd330',
      position: '홍보팀장'
    },
    {
      name: '이건주',
      description:
        '수학과/데이터사이언스 복수전공 중인 이건주입니다. 데이터 분석 및 의료 인공지능 관련 연구에 관심이 있습니다.',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/af8e58f0-f6bf-4bbe-9423-0f7c62ba4e47',
      position: '인사팀장'
    },
    {
      name: '김성중',
      description:
        '소프트웨어를 전공하고 있는 김성중입니다. 앱개발 및 시스템보안에 관심이 있습니다.',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/452f4f2a-6090-4400-bb64-20580aa0841e',
      position: '재무팀장'
    },
    {
      name: '권서진',
      description:
        '안녕하세요! 코딩 잘하고 싶은 권서진입니다. 코밋에 가장 많이 커밋하는 것을 목표로 열심히 달려보겠습니다.',
      imageUrl:
        'https://github.com/skku-comit/comit-website/assets/97675977/44136781-209a-4356-8434-2c645f408aef',
      position: '개발팀장'
    }
  ]
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const res = await request.json()
  return NextResponse.json({ res })
}
