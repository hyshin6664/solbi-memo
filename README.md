# 솔비 메모 PWA

신현식님 전용 빠른 메모 PWA. 텍스트 + 사진 + 위치를 한 번에 솔비 메모큐에 저장.

## 🎯 특징

- **외부 의존성 0** — CDN·라이브러리 없음. 5개 파일 정적 호스팅.
- **오프라인 OK** — Service Worker 셸 캐시 + localStorage 큐. 네트워크 끊겨도 저장, 온라인 복귀 시 자동 전송.
- **위치 자동** — 권한 1회 받으면 모든 메모에 자동 첨부 (캐시 30분).
- **음성 녹음 X** — Z Fold4 기본 「음성 녹음」 앱 사용 후 Drive 동기화 흐름과 분리.
- **백엔드** — 솔비 saveMemo API (Apps Script). dashSecret 인증으로 hyshin@solbox.com 도메인 잠금.

## 📦 파일

| 파일 | 역할 |
|---|---|
| `index.html` | UI + 로직 (1파일) |
| `sw.js` | Service Worker (오프라인 셸) |
| `manifest.webmanifest` | PWA 매니페스트 |
| `icon-192.png` / `icon-512.png` | PWA 아이콘 |
| `icon-512-maskable.png` | Android 적응형 아이콘 |
| `apple-touch-icon.png` | iOS 홈화면 아이콘 |

## 🚀 GitHub Pages 배포

```bash
cd "G:/내 드라이브/배포/코드/solbi-memo"
git init
git add .
git commit -m "Initial: 솔비 메모 PWA v1.0"
git branch -M main
git remote add origin git@github.com:hyshin6664/solbi-memo.git
git push -u origin main
# GitHub → Settings → Pages → Source: main / root → Save
# 접속: https://hyshin6664.github.io/solbi-memo/
```

폰에서 Chrome으로 접속 → 메뉴 → 「홈 화면에 추가」 → PWA 설치 완료.

## 🔐 인증

`dashSecret`은 코드에 박혀있음. 솔로 유저 운용 + 솔비 Apps Script가 `saveMemo` action에서만 dashSecret 검증 → 다른 API 호출은 PWA_TOKEN 필요. 시크릿 노출돼도 메모 추가만 가능 (읽기·삭제 불가).

## 🔄 음성 워크플로 (별도)

본 PWA는 음성 X. 음성은 다음 흐름으로 분리:

1. Z Fold4 기본 「음성 녹음」 앱 → m4a 저장
2. 「내 파일 → 녹음 폴더」 → Google Drive 「녹음」 폴더로 자동 백업 (1회 설정)
3. PC가 Drive 동기화 → `Claude_브리프/메모큐/대기/` (또는 `음성/audio/`)
4. 클로드에 「/메모정리」 명령 → faster-whisper로 STT → 분류 → 대시보드 반영

## 📝 변경 이력

- **v1.0** (2026-05-19) — 최초 릴리즈. 텍스트·사진·파일·위치 자동·오프라인 큐.
