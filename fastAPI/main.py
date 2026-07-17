from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import json
import os
from fastapi.staticfiles import StaticFiles

#print("현재 FastAPI 서버 실행 경로:", os.getcwd())

app = FastAPI()
#정적 파일들을 /html 경로에서 서빙하기 위해 mount
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/html", StaticFiles(directory="html"), name="html")
app.mount("/script", StaticFiles(directory="script"), name="js")

# html 디렉토리를 템플릿 폴더로 지정
templates = Jinja2Templates(directory="html")

@app.get("/", response_class=HTMLResponse)
def form_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/", response_class=HTMLResponse)
def form_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/signUp.html", response_class=HTMLResponse)
async def sign_up_page(request: Request):
    return templates.TemplateResponse("signUp.html", {"request": request})

@app.post("/signUpResultPost")
async def signup(
    request: Request,
    userId: str = Form(...),
    userPw: str = Form(...),
    userEmail: str = Form(""),
    emailDomain: str = Form(""),
    userName: str = Form(...),
    userBirth: str = Form(""),
    gender: str = Form("none"),
    intro: str = Form("")
):
    # 실패 조건 예시: 비밀번호가 6자 미만이면 실패 처리 다만, 이번에는 프론트에서 처리함
    if len(userPw) < 4:
        print("❌ 회원가입 실패: 비밀번호가 너무 짧습니다.")
        return templates.TemplateResponse(
            "signUpResultPost.html",
            {"request": request, "error": "비밀번호가 너무 짧습니다."}
        )

    email_full = f"{userEmail}@{emailDomain}" if userEmail else ""

    result = {
        "아이디": userId,
        "비밀번호": userPw,
        "이메일": email_full,
        "이름": userName,
        "생년월일": userBirth,
        "성별": gender,
        "자기소개": intro
    }

    # 콘솔에 최종 결과 출력
    print("===== 회원가입 성공 =====")
    for k, v in result.items():
        print(f"{k}: {v}")
    print("=========================")

    # JSON을 문자열로 변환해서 HTML에 포함
    return templates.TemplateResponse(
        "signUpResultPost.html",
        {
            "request": request,
            "result_json": json.dumps(result, ensure_ascii=False, indent=2)
        }
    )
