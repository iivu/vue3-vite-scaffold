import { get, post } from '@/shared/http';

export function sendVerifyCode(data:{ mobile:string }) {
    return post<{remainderSecond: number}>('',data)
}