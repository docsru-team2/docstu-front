'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './SubmissionEditor.css.js';
import bold from '@public/img/editor/bold.svg';
import italic from '@public/img/editor/italic.svg';
import underline from '@public/img/editor/underline.svg';
import alignmentLeft from '@public/img/editor/alignment_left.svg';
import alignmentCenter from '@public/img/editor/alignment_center.svg';
import alignmentRight from '@public/img/editor/alignment_right.svg';
import bullet from '@public/img/editor/bullet.svg';
import numbering from '@public/img/editor/numbering.svg';
import colorBox from '@public/img/editor/colorBox.svg';
import closeIcon from '@public/img/btn/closeIcon.svg';
import Image from 'next/image.js';
import OriginalViewer from './OriginalViewer/OriginalViewer.jsx';
import EditorHeader from '@/components/Header/Editor/Editor.jsx';
import { ConfirmModal, LoadDraftsModal } from '@/components/Common/Modal/Modal';
import { api } from '@/lib/fetchClient';
import Button from '@/components/Common/Button/Button.jsx';

export default function SubmissionEditor({
  challengeId,
  userType,
  isParticipant,
  submissionId,
  onSubmit: customSubmit,
}) {
  const router = useRouter();
  const editorRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [showDraftBar, setShowDraftBar] = useState(false);
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (submissionId) {
      async function fetchSubmission() {
        try {
          const data = await api.get(`/submissions/${submissionId}`);
          setTitle(data.data.title || '');
          setContent(data.data.content || '');
          if (editorRef.current) {
            editorRef.current.innerHTML = data.data.content || '';
          }
        } catch (e) {
          console.error('작업물 조회 실패:', e);
        }
      }
      fetchSubmission();
    }
  }, [submissionId]);

  useEffect(() => {
    if (userType === 'ADMIN') return;
    async function fetchDrafts() {
      try {
        const data = await api.get(`/challenges/${challengeId}/drafts`);
        if (data.length > 0) {
          setDrafts(data);
          setShowDraftBar(true);
        }
      } catch {
        // 임시저장 없으면 무시
      }
    }
    if (challengeId) fetchDrafts();
  }, [challengeId, userType]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSaveDraft = async () => {
    if (!content) {
      setModalMessage('컨텐츠를 입력해주세요');
      return;
    }

    try {
      await api.post(`/challenges/${challengeId}/draft`, { title, content });
      setModalMessage('임시저장 되었습니다.');
    } catch (e) {
      console.error('임시저장 실패:', e);
    }
  };

  const defaultSubmit = async () => {
    try {
      if (submissionId) {
        await api.patch(`/submissions/${submissionId}`, { title, content });
        setModalMessage('수정되었습니다.');
        setIsSubmitted(true);
      } else {
        await api.post(`/challenges/${challengeId}/submissions`, {
          title,
          content,
        });
        setModalMessage('제출되었습니다.');
        setIsSubmitted(true);
      }
    } catch (e) {
      console.error('제출 실패:', e);
    }
  };

  const handleSubmit = async () => {
    if (!content) {
      setModalMessage('컨텐츠를 입력해주세요');
      return;
    }

    if (customSubmit) {
      await customSubmit({ title, content, submissionId, challengeId });
    } else {
      await defaultSubmit();
    }
  };

  const handleSelectDraft = (draft) => {
    setTitle(draft.title || '');
    setContent(draft.content || '');
    if (editorRef.current) {
      editorRef.current.innerHTML = draft.content || '';
    }
  };

  const handleColorChange = (color) => {
    execCommand('foreColor', color);
    setShowColorPicker(false);
  };
  console.log(showDraftBar);
  const colors = [
    '#000000',
    '#FF0000',
    '#FF8800',
    '#FFCC00',
    '#00CC00',
    '#0066FF',
    '#9933FF',
    '#FF3399',
  ];
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <EditorHeader
        userType={userType}
        isParticipant={isParticipant}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
      />
      {modalMessage && (
        <ConfirmModal
          message={modalMessage}
          onConfirm={() => {
            setModalMessage('');
            if (isSubmitted) {
              router.push(`/challenge/detail/${challengeId}?page=1`);
            }
          }}
          onClose={() => {
            setModalMessage('');
            if (isSubmitted) {
              router.push(`/challenge/detail/${challengeId}?page=1`);
            }
          }}
        />
      )}
      <div className={styles.container}>
        {userType !== 'ADMIN' && showDraftBar && (
          <div className={styles.draftBar}>
            <div className={styles.draftBarLeft}>
              <button
                type="button"
                className={styles.draftCloseBtn}
                onClick={() => setShowDraftBar(false)}
              >
                <Image src={closeIcon} alt="닫기" />
              </button>
              임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요??
            </div>
            <Button
              size="sm"
              color="primary"
              onClick={() => setShowDraftsModal(true)}
            >
              불러오기
            </Button>
          </div>
        )}
        {showDraftsModal && (
          <LoadDraftsModal
            data={drafts}
            onClose={() => setShowDraftsModal(false)}
            onSelectDraft={handleSelectDraft}
          />
        )}
        <input
          placeholder="제목을 입력해주세여"
          className={styles.titleInput}
          name="title"
          value={title}
          onChange={handleChange}
        />

        {/* 툴바 — 각 버튼은 onMouseDown + preventDefault로 에디터의 선택 영역을 유지 */}
        <div className={styles.textEditorHeader}>
          {/* B / I / U — 텍스트 스타일 */}
          <div className={styles.textEditorItemBox}>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('bold');
              }}
            >
              <Image src={bold} alt="bold" />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('italic');
              }}
            >
              <Image src={italic} alt="italic" />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('underline');
              }}
            >
              <Image src={underline} alt="underline" />
            </button>
          </div>

          {/* 정렬 — justifyLeft / Center / Right */}
          <div className={styles.textEditorItemBox}>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('justifyLeft');
              }}
            >
              <Image src={alignmentLeft} alt="alignmentLeft" />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('justifyCenter');
              }}
            >
              <Image src={alignmentCenter} alt="alignmentCenter" />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('justifyRight');
              }}
            >
              <Image src={alignmentRight} alt="alignmentRight" />
            </button>
          </div>

          {/* 리스트 — 불릿 / 번호 */}
          <div className={styles.textEditorItemBox}>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('insertUnorderedList');
              }}
            >
              <Image src={bullet} alt="bullet" />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand('insertOrderedList');
              }}
            >
              <Image src={numbering} alt="numbering" />
            </button>
          </div>

          {/* 컬러 — 클릭 시 컬러피커 토글 */}
          <div className={styles.colorPickerWrapper}>
            <button
              type="button"
              className={styles.toolbarBtn}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowColorPicker((prev) => !prev);
              }}
            >
              <Image src={colorBox} alt="colorBox" />
            </button>
            {showColorPicker && (
              <div className={styles.colorPicker}>
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleColorChange(color);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 에디터 본문 — contentEditable div */}
        <div
          ref={editorRef}
          contentEditable
          className={styles.editorArea}
          data-placeholder="번역 내용을 적어주세요"
          onInput={() => {
            const el = editorRef.current;
            if (el.innerHTML === '<br>' || el.innerHTML === '') {
              el.innerHTML = '';
            }
            setContent(el.innerHTML);
          }}
        />
        <OriginalViewer />
      </div>
    </>
  );
}
