"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight, Check, ArrowUpRight } from 'lucide-react';
import { ProjectStoreLinks } from './store/ProjectStoreLinks';
import { getStoreKind } from '@/lib/storeUrls';
import extStyles from './store/StoreHoverCard.module.css';
import styles from './ProjectCard.module.css';

export interface PreviewImage {
  title: string;
  src: string;
}

interface ProjectProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveLink?: string;
  playStoreLink?: string;
  appStoreLink?: string;
  githubLink?: string;
  features?: string[];
  compact?: boolean;
  previewImages?: PreviewImage[];
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveLink,
  playStoreLink,
  appStoreLink,
  githubLink,
  features,
  compact,
  previewImages,
}: ProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !previewImages) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % previewImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, previewImages]);

  const currentPreview = previewImages ? previewImages[activeImageIndex] : null;

  // "DiscountBuddy (Client Project)" -> name + badge
  const badgeMatch = title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const name = badgeMatch ? badgeMatch[1] : title;
  const badge = badgeMatch ? badgeMatch[2] : null;

  const maxFeatures = compact ? 3 : 5;
  const maxTags = compact ? 5 : 8;
  const shownFeatures = features?.slice(0, maxFeatures);
  const shownTags = tags.slice(0, maxTags);
  const hiddenTags = tags.length - shownTags.length;
  const playUrl =
    playStoreLink ??
    (liveLink && getStoreKind(liveLink) === 'play' ? liveLink : undefined);
  const appleUrl =
    appStoreLink ??
    (liveLink && getStoreKind(liveLink) === 'apple' ? liveLink : undefined);
  const webUrl =
    liveLink && !getStoreKind(liveLink) ? liveLink : undefined;
  const hasStoreLinks = Boolean(playUrl || appleUrl);
  const hasActions = Boolean(
    previewImages?.length || webUrl || githubLink || hasStoreLinks,
  );

  return (
    <>
      <motion.article
        whileHover={compact ? undefined : { y: -3 }}
        className={`${styles.card} ${compact ? styles.compact : ''}`}
      >
        <div className={styles.body}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.description}>{description}</p>

          {shownFeatures && shownFeatures.length > 0 && (
            <ul className={styles.features}>
              {shownFeatures.map((feature, index) => (
                <li key={index}>
                  <Check size={14} className={styles.featureIcon} aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.tags}>
            {shownTags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
            {hiddenTags > 0 && <span className={styles.tagMore}>+{hiddenTags}</span>}
          </div>
        </div>

        {hasActions && (
          <div className={styles.footer}>
            <div className={styles.footerLinks}>
              {previewImages && previewImages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={`${extStyles.ext} ${styles.footerExtBtn}`}
                >
                  preview
                  <Eye className={extStyles.extIcon} size={11} aria-hidden />
                </button>
              )}
              {webUrl && (
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={extStyles.ext}
                >
                  live demo
                  <ArrowUpRight className={extStyles.extIcon} aria-hidden />
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={extStyles.ext}
                >
                  github
                  <ArrowUpRight className={extStyles.extIcon} aria-hidden />
                </a>
              )}
            </div>
            {hasStoreLinks && (
              <ProjectStoreLinks
                appName={name}
                playStore={playUrl}
                appStore={appleUrl}
              />
            )}
          </div>
        )}
      </motion.article>

      {/* Clean Fullscreen Portal Lightbox */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && previewImages && currentPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.lightboxOverlay}
              onClick={() => setIsModalOpen(false)}
            >
              {/* Floating Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.lightboxCloseBtn}
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>

              {/* Prev Navigation Arrow */}
              {previewImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
                  }}
                  className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              {/* Main Image Container */}
              <div
                className={styles.lightboxContainer}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.lightboxImageWrapper}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: 'relative', width: '100%', height: '100%' }}
                    >
                      <Image
                        src={currentPreview.src}
                        alt={currentPreview.title}
                        fill
                        className={styles.lightboxImage}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Next Navigation Arrow */}
              {previewImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev + 1) % previewImages.length);
                  }}
                  className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
                  aria-label="Next image"
                >
                  <ChevronRight size={26} />
                </button>
              )}

              {/* Bottom Caption & Dot Navigation Bar */}
              <div
                className={styles.lightboxCaptionBar}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.lightboxTitle}>{currentPreview.title}</span>
                {previewImages.length > 1 && (
                  <div className={styles.lightboxDots}>
                    {previewImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`${styles.lightboxDot} ${idx === activeImageIndex ? styles.lightboxDotActive : ''}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ProjectCard;
