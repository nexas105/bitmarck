import {NextRequest, NextResponse} from 'next/server';
import {getSession} from '@/lib/session';
import {getRepoData} from '@/lib/github';

const GITHUB_NAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const {searchParams} = request.nextUrl;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      {error: 'Missing owner or repo parameter'},
      {status: 400}
    );
  }

  if (!GITHUB_NAME_PATTERN.test(owner) || !GITHUB_NAME_PATTERN.test(repo)) {
    return NextResponse.json(
      {error: 'Invalid owner or repo format'},
      {status: 400}
    );
  }

  const data = await getRepoData(owner, repo);

  if (!data) {
    return NextResponse.json(
      {error: 'Repository not found'},
      {status: 404}
    );
  }

  return NextResponse.json(data);
}
