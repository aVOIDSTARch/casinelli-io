export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          label: string
          type: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          label: string
          type: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          label?: string
          type?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_attachments: {
        Row: {
          alt: string | null
          comment_id: string
          filename: string | null
          id: string
          mime_type: string | null
          size: number | null
          sort_order: number | null
          thumbnail_url: string | null
          type: Database["public"]["Enums"]["attachment_type"]
          url: string
        }
        Insert: {
          alt?: string | null
          comment_id: string
          filename?: string | null
          id?: string
          mime_type?: string | null
          size?: number | null
          sort_order?: number | null
          thumbnail_url?: string | null
          type: Database["public"]["Enums"]["attachment_type"]
          url: string
        }
        Update: {
          alt?: string | null
          comment_id?: string
          filename?: string | null
          id?: string
          mime_type?: string | null
          size?: number | null
          sort_order?: number | null
          thumbnail_url?: string | null
          type?: Database["public"]["Enums"]["attachment_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_attachments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_attachments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_edit_history: {
        Row: {
          comment_id: string
          content: string
          edited_at: string
          id: string
          reason: string | null
        }
        Insert: {
          comment_id: string
          content: string
          edited_at?: string
          id?: string
          reason?: string | null
        }
        Update: {
          comment_id?: string
          content?: string
          edited_at?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_edit_history_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_edit_history_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_flags: {
        Row: {
          comment_id: string
          details: string | null
          id: string
          reason: Database["public"]["Enums"]["flag_reason"]
          reported_at: string
          reported_by: string | null
        }
        Insert: {
          comment_id: string
          details?: string | null
          id?: string
          reason: Database["public"]["Enums"]["flag_reason"]
          reported_at?: string
          reported_by?: string | null
        }
        Update: {
          comment_id?: string
          details?: string | null
          id?: string
          reason?: Database["public"]["Enums"]["flag_reason"]
          reported_at?: string
          reported_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_flags_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_flags_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_flags_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_flags_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_mentions: {
        Row: {
          comment_id: string
          end_index: number | null
          id: string
          start_index: number | null
          user_id: string
          username: string
        }
        Insert: {
          comment_id: string
          end_index?: number | null
          id?: string
          start_index?: number | null
          user_id: string
          username: string
        }
        Update: {
          comment_id?: string
          end_index?: number | null
          id?: string
          start_index?: number | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_mentions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_mentions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_mentions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_mentions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_metadata: {
        Row: {
          city: string | null
          comment_id: string
          country: string | null
          id: string
          ip_address: unknown
          referrer: string | null
          region: string | null
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          comment_id: string
          country?: string | null
          id?: string
          ip_address?: unknown
          referrer?: string | null
          region?: string | null
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          comment_id?: string
          country?: string | null
          id?: string
          ip_address?: unknown
          referrer?: string | null
          region?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_metadata_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_metadata_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_moderation_actions: {
        Row: {
          action: Database["public"]["Enums"]["moderation_action"]
          comment_id: string
          id: string
          moderator_id: string | null
          reason: string | null
          timestamp: string
        }
        Insert: {
          action: Database["public"]["Enums"]["moderation_action"]
          comment_id: string
          id?: string
          moderator_id?: string | null
          reason?: string | null
          timestamp?: string
        }
        Update: {
          action?: Database["public"]["Enums"]["moderation_action"]
          comment_id?: string
          id?: string
          moderator_id?: string | null
          reason?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_moderation_actions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderation_actions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_moderator_notes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          moderator_id: string
          note: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          moderator_id: string
          note: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          moderator_id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_moderator_notes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderator_notes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderator_notes_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_moderator_notes_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_notifications: {
        Row: {
          comment_id: string
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          notify_on_reply: boolean | null
        }
        Insert: {
          comment_id: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          notify_on_reply?: boolean | null
        }
        Update: {
          comment_id?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          notify_on_reply?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_notifications_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_notifications_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_reactions: {
        Row: {
          comment_id: string
          count: number | null
          id: string
          reaction_type: string
        }
        Insert: {
          comment_id: string
          count?: number | null
          id?: string
          reaction_type: string
        }
        Update: {
          comment_id?: string
          count?: number | null
          id?: string
          reaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_user_reactions: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          reaction_type: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_user_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          anonymous_email: string | null
          anonymous_name: string | null
          anonymous_website: string | null
          approved_at: string | null
          approved_by: string | null
          author_id: string | null
          content: string
          content_format: Database["public"]["Enums"]["content_format"] | null
          content_html: string | null
          created_at: string
          depth: number | null
          gravatar_hash: string | null
          id: string
          is_author_reply: boolean | null
          is_edited: boolean | null
          is_highlighted: boolean | null
          is_pinned: boolean | null
          parent_id: string | null
          post_id: string
          reply_count: number | null
          root_id: string | null
          sentiment_label: string | null
          sentiment_score: number | null
          spam_score: number | null
          status: Database["public"]["Enums"]["comment_status"]
          toxicity_score: number | null
          updated_at: string | null
        }
        Insert: {
          anonymous_email?: string | null
          anonymous_name?: string | null
          anonymous_website?: string | null
          approved_at?: string | null
          approved_by?: string | null
          author_id?: string | null
          content: string
          content_format?: Database["public"]["Enums"]["content_format"] | null
          content_html?: string | null
          created_at?: string
          depth?: number | null
          gravatar_hash?: string | null
          id?: string
          is_author_reply?: boolean | null
          is_edited?: boolean | null
          is_highlighted?: boolean | null
          is_pinned?: boolean | null
          parent_id?: string | null
          post_id: string
          reply_count?: number | null
          root_id?: string | null
          sentiment_label?: string | null
          sentiment_score?: number | null
          spam_score?: number | null
          status?: Database["public"]["Enums"]["comment_status"]
          toxicity_score?: number | null
          updated_at?: string | null
        }
        Update: {
          anonymous_email?: string | null
          anonymous_name?: string | null
          anonymous_website?: string | null
          approved_at?: string | null
          approved_by?: string | null
          author_id?: string | null
          content?: string
          content_format?: Database["public"]["Enums"]["content_format"] | null
          content_html?: string | null
          created_at?: string
          depth?: number | null
          gravatar_hash?: string | null
          id?: string
          is_author_reply?: boolean | null
          is_edited?: boolean | null
          is_highlighted?: boolean | null
          is_pinned?: boolean | null
          parent_id?: string | null
          post_id?: string
          reply_count?: number | null
          root_id?: string | null
          sentiment_label?: string | null
          sentiment_score?: number | null
          spam_score?: number | null
          status?: Database["public"]["Enums"]["comment_status"]
          toxicity_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_root_id_fkey"
            columns: ["root_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_root_id_fkey"
            columns: ["root_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      image_thumbnails: {
        Row: {
          height: number | null
          id: string
          image_id: string
          size_name: string
          url: string
          width: number | null
        }
        Insert: {
          height?: number | null
          id?: string
          image_id: string
          size_name: string
          url: string
          width?: number | null
        }
        Update: {
          height?: number | null
          id?: string
          image_id?: string
          size_name?: string
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "image_thumbnails_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          alt: string | null
          blurhash: string | null
          caption: string | null
          created_at: string
          credit: string | null
          height: number | null
          id: string
          uploaded_by: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          height?: number | null
          id?: string
          uploaded_by?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          height?: number | null
          id?: string
          uploaded_by?: string | null
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "images_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_attachments: {
        Row: {
          description: string | null
          download_count: number | null
          filename: string
          id: string
          mime_type: string | null
          post_id: string
          size: number | null
          sort_order: number | null
          url: string
        }
        Insert: {
          description?: string | null
          download_count?: number | null
          filename: string
          id?: string
          mime_type?: string | null
          post_id: string
          size?: number | null
          sort_order?: number | null
          url: string
        }
        Update: {
          description?: string | null
          download_count?: number | null
          filename?: string
          id?: string
          mime_type?: string | null
          post_id?: string
          size?: number | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_attachments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_attachments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_attachments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_bookmarks: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_categories: {
        Row: {
          category_id: string
          id: string
          post_id: string
        }
        Insert: {
          category_id: string
          id?: string
          post_id: string
        }
        Update: {
          category_id?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_coauthors: {
        Row: {
          added_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          added_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_coauthors_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_coauthors_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_coauthors_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_coauthors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_coauthors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_code_blocks: {
        Row: {
          code: string
          filename: string | null
          highlight_lines: number[] | null
          id: string
          language: string | null
          post_id: string
          show_line_numbers: boolean | null
          sort_order: number | null
        }
        Insert: {
          code: string
          filename?: string | null
          highlight_lines?: number[] | null
          id?: string
          language?: string | null
          post_id: string
          show_line_numbers?: boolean | null
          sort_order?: number | null
        }
        Update: {
          code?: string
          filename?: string | null
          highlight_lines?: number[] | null
          id?: string
          language?: string | null
          post_id?: string
          show_line_numbers?: boolean | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_code_blocks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_code_blocks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_code_blocks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comment_settings: {
        Row: {
          allow_anonymous: boolean | null
          close_after_days: number | null
          enabled: boolean | null
          id: string
          max_depth: number | null
          moderation: Database["public"]["Enums"]["moderation_mode"] | null
          post_id: string
          require_approval: boolean | null
        }
        Insert: {
          allow_anonymous?: boolean | null
          close_after_days?: number | null
          enabled?: boolean | null
          id?: string
          max_depth?: number | null
          moderation?: Database["public"]["Enums"]["moderation_mode"] | null
          post_id: string
          require_approval?: boolean | null
        }
        Update: {
          allow_anonymous?: boolean | null
          close_after_days?: number | null
          enabled?: boolean | null
          id?: string
          max_depth?: number | null
          moderation?: Database["public"]["Enums"]["moderation_mode"] | null
          post_id?: string
          require_approval?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comment_settings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comment_settings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_comment_settings_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_embeds: {
        Row: {
          caption: string | null
          embed_code: string | null
          id: string
          post_id: string
          sort_order: number | null
          type: Database["public"]["Enums"]["embed_type"]
          url: string
        }
        Insert: {
          caption?: string | null
          embed_code?: string | null
          id?: string
          post_id: string
          sort_order?: number | null
          type: Database["public"]["Enums"]["embed_type"]
          url: string
        }
        Update: {
          caption?: string | null
          embed_code?: string | null
          id?: string
          post_id?: string
          sort_order?: number | null
          type?: Database["public"]["Enums"]["embed_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_embeds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_embeds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_embeds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          id: string
          image_id: string
          post_id: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          image_id: string
          post_id: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          image_id?: string
          post_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_navigation: {
        Row: {
          id: string
          next_post_id: string | null
          post_id: string
          previous_post_id: string | null
        }
        Insert: {
          id?: string
          next_post_id?: string | null
          post_id: string
          previous_post_id?: string | null
        }
        Update: {
          id?: string
          next_post_id?: string | null
          post_id?: string
          previous_post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_navigation_next_post_id_fkey"
            columns: ["next_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_navigation_next_post_id_fkey"
            columns: ["next_post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_navigation_next_post_id_fkey"
            columns: ["next_post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_navigation_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_navigation_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_navigation_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_navigation_previous_post_id_fkey"
            columns: ["previous_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_navigation_previous_post_id_fkey"
            columns: ["previous_post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_navigation_previous_post_id_fkey"
            columns: ["previous_post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_open_graph: {
        Row: {
          description: string | null
          id: string
          image_url: string | null
          post_id: string
          title: string | null
          type: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          image_url?: string | null
          post_id: string
          title?: string | null
          type?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          image_url?: string | null
          post_id?: string
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_open_graph_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_open_graph_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_open_graph_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          count: number | null
          enabled: boolean | null
          id: string
          post_id: string
          reaction_type: string
        }
        Insert: {
          count?: number | null
          enabled?: boolean | null
          id?: string
          post_id: string
          reaction_type: string
        }
        Update: {
          count?: number | null
          enabled?: boolean | null
          id?: string
          post_id?: string
          reaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_revisions: {
        Row: {
          change_note: string | null
          changed_at: string
          changed_by: string | null
          content: string | null
          id: string
          post_id: string
          revision: number
          title: string | null
        }
        Insert: {
          change_note?: string | null
          changed_at?: string
          changed_by?: string | null
          content?: string | null
          id?: string
          post_id: string
          revision: number
          title?: string | null
        }
        Update: {
          change_note?: string | null
          changed_at?: string
          changed_by?: string | null
          content?: string | null
          id?: string
          post_id?: string
          revision?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_revisions_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_revisions_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_seo: {
        Row: {
          canonical_url: string | null
          focus_keyword: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          no_follow: boolean | null
          no_index: boolean | null
          post_id: string
          structured_data: Json | null
        }
        Insert: {
          canonical_url?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          no_follow?: boolean | null
          no_index?: boolean | null
          post_id: string
          structured_data?: Json | null
        }
        Update: {
          canonical_url?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          no_follow?: boolean | null
          no_index?: boolean | null
          post_id?: string
          structured_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "post_seo_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_seo_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_seo_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_sponsorship: {
        Row: {
          disclosure_text: string | null
          id: string
          is_sponsored: boolean | null
          post_id: string
          sponsor: string | null
          sponsor_logo_url: string | null
          sponsor_url: string | null
        }
        Insert: {
          disclosure_text?: string | null
          id?: string
          is_sponsored?: boolean | null
          post_id: string
          sponsor?: string | null
          sponsor_logo_url?: string | null
          sponsor_url?: string | null
        }
        Update: {
          disclosure_text?: string | null
          id?: string
          is_sponsored?: boolean | null
          post_id?: string
          sponsor?: string | null
          sponsor_logo_url?: string | null
          sponsor_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_sponsorship_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_sponsorship_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_sponsorship_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_stats: {
        Row: {
          bookmarks: number | null
          comment_count: number | null
          id: string
          likes: number | null
          post_id: string
          shares: number | null
          unique_views: number | null
          updated_at: string
          views: number | null
        }
        Insert: {
          bookmarks?: number | null
          comment_count?: number | null
          id?: string
          likes?: number | null
          post_id: string
          shares?: number | null
          unique_views?: number | null
          updated_at?: string
          views?: number | null
        }
        Update: {
          bookmarks?: number | null
          comment_count?: number | null
          id?: string
          likes?: number | null
          post_id?: string
          shares?: number | null
          unique_views?: number | null
          updated_at?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_stats_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_stats_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_stats_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          id: string
          post_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          post_id: string
          tag_id: string
        }
        Update: {
          id?: string
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      post_toc: {
        Row: {
          heading_id: string
          id: string
          level: number
          parent_id: string | null
          post_id: string
          sort_order: number | null
          text: string
        }
        Insert: {
          heading_id: string
          id?: string
          level: number
          parent_id?: string | null
          post_id: string
          sort_order?: number | null
          text: string
        }
        Update: {
          heading_id?: string
          id?: string
          level?: number
          parent_id?: string | null
          post_id?: string
          sort_order?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_toc_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_toc"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_toc_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_toc_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_toc_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_translations: {
        Row: {
          id: string
          locale: string
          original_post_id: string
          translated_post_id: string
        }
        Insert: {
          id?: string
          locale: string
          original_post_id: string
          translated_post_id: string
        }
        Update: {
          id?: string
          locale?: string
          original_post_id?: string
          translated_post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_translations_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_translations_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_translations_original_post_id_fkey"
            columns: ["original_post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_translations_translated_post_id_fkey"
            columns: ["translated_post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_translations_translated_post_id_fkey"
            columns: ["translated_post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_translations_translated_post_id_fkey"
            columns: ["translated_post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_twitter_card: {
        Row: {
          card: string | null
          description: string | null
          id: string
          image_url: string | null
          post_id: string
          title: string | null
        }
        Insert: {
          card?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          post_id: string
          title?: string | null
        }
        Update: {
          card?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          post_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_twitter_card_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_twitter_card_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_twitter_card_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_user_reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_user_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_user_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_views: {
        Row: {
          id: string
          ip_hash: string | null
          post_id: string
          session_id: string | null
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_hash?: string | null
          post_id: string
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_hash?: string | null
          post_id?: string
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          content: string
          content_format: Database["public"]["Enums"]["content_format"] | null
          created_at: string
          custom_fields: Json | null
          description: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image_id: string | null
          featured_order: number | null
          id: string
          locale: string | null
          password: string | null
          published_at: string | null
          reading_time_minutes: number | null
          revision: number | null
          scheduled_at: string | null
          series_id: string | null
          series_part: number | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          subtitle: string | null
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["post_visibility"] | null
          word_count: number | null
        }
        Insert: {
          author_id: string
          content: string
          content_format?: Database["public"]["Enums"]["content_format"] | null
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_id?: string | null
          featured_order?: number | null
          id?: string
          locale?: string | null
          password?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          revision?: number | null
          scheduled_at?: string | null
          series_id?: string | null
          series_part?: number | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          subtitle?: string | null
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"] | null
          word_count?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          content_format?: Database["public"]["Enums"]["content_format"] | null
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_id?: string | null
          featured_order?: number | null
          id?: string
          locale?: string | null
          password?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          revision?: number | null
          scheduled_at?: string | null
          series_id?: string | null
          series_part?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          subtitle?: string | null
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["post_visibility"] | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_featured_image_id_fkey"
            columns: ["featured_image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
      related_posts: {
        Row: {
          id: string
          post_id: string
          related_post_id: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          post_id: string
          related_post_id: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          post_id?: string
          related_post_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "related_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "related_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_posts_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_posts_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "related_posts_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          author_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          total_parts: number | null
          updated_at: string
        }
        Insert: {
          author_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          total_parts?: number | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          total_parts?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "series_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "series_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          post_count: number | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          post_count?: number | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          post_count?: number | null
          slug?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          awarded_by: string | null
          badge_id: string
          id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          awarded_by?: string | null
          badge_id: string
          id?: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          awarded_by?: string | null
          badge_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_awarded_by_fkey"
            columns: ["awarded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_awarded_by_fkey"
            columns: ["awarded_by"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_social_links: {
        Row: {
          created_at: string
          handle: string
          id: string
          platform: string
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          handle: string
          id?: string
          platform: string
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          handle?: string
          id?: string
          platform?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_social_links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_social_links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          email: string
          id: string
          is_admin: boolean | null
          is_moderator: boolean | null
          is_verified: boolean | null
          reputation: number | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          email: string
          id: string
          is_admin?: boolean | null
          is_moderator?: boolean | null
          is_verified?: boolean | null
          reputation?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          is_admin?: boolean | null
          is_moderator?: boolean | null
          is_verified?: boolean | null
          reputation?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_comments: {
        Row: {
          author: Json | null
          content: string | null
          content_format: Database["public"]["Enums"]["content_format"] | null
          content_html: string | null
          created_at: string | null
          depth: number | null
          id: string | null
          is_author_reply: boolean | null
          is_edited: boolean | null
          is_highlighted: boolean | null
          is_pinned: boolean | null
          parent_id: string | null
          post_id: string | null
          reactions: Json | null
          reply_count: number | null
          root_id: string | null
          sentiment_label: string | null
          sentiment_score: number | null
          status: Database["public"]["Enums"]["comment_status"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_post_taxonomy"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "v_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_root_id_fkey"
            columns: ["root_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_root_id_fkey"
            columns: ["root_id"]
            isOneToOne: false
            referencedRelation: "v_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      v_post_taxonomy: {
        Row: {
          categories: string[] | null
          post_id: string | null
          tags: string[] | null
        }
        Relationships: []
      }
      v_posts: {
        Row: {
          author: Json | null
          content: string | null
          content_format: Database["public"]["Enums"]["content_format"] | null
          created_at: string | null
          custom_fields: Json | null
          description: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image: Json | null
          featured_order: number | null
          id: string | null
          locale: string | null
          published_at: string | null
          reading_time: Json | null
          reading_time_minutes: number | null
          revision: number | null
          scheduled_at: string | null
          seo: Json | null
          series: Json | null
          slug: string | null
          stats: Json | null
          status: Database["public"]["Enums"]["post_status"] | null
          subtitle: string | null
          title: string | null
          updated_at: string | null
          visibility: Database["public"]["Enums"]["post_visibility"] | null
          word_count: number | null
        }
        Relationships: []
      }
      v_user_profiles: {
        Row: {
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string | null
          is_admin: boolean | null
          is_moderator: boolean | null
          is_verified: boolean | null
          reputation: number | null
          social_links: Json | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_reading_time: {
        Args: { content_text: string }
        Returns: {
          minutes: number
          words: number
        }[]
      }
      get_post_by_slug: {
        Args: { post_slug: string }
        Returns: {
          categories: string[]
          post: Json
          tags: string[]
        }[]
      }
      get_post_comments: {
        Args: { include_pending?: boolean; p_post_id: string }
        Returns: Json
      }
      get_published_posts: {
        Args: {
          category_filter?: string
          page_num?: number
          page_size?: number
          tag_filter?: string
        }
        Returns: {
          posts: Json
          total_count: number
          total_pages: number
        }[]
      }
      get_related_posts: {
        Args: { limit_count?: number; p_post_id: string }
        Returns: Json
      }
      increment_post_views: {
        Args: {
          p_ip_hash?: string
          p_post_id: string
          p_session_id?: string
          p_user_id?: string
        }
        Returns: undefined
      }
      search_posts: {
        Args: { page_num?: number; page_size?: number; search_query: string }
        Returns: {
          posts: Json
          total_count: number
        }[]
      }
    }
    Enums: {
      attachment_type: "image" | "gif" | "link" | "file"
      comment_status:
        | "pending"
        | "approved"
        | "spam"
        | "rejected"
        | "deleted"
        | "flagged"
      content_format: "html" | "markdown" | "mdx" | "plaintext"
      embed_type:
        | "youtube"
        | "vimeo"
        | "twitter"
        | "codepen"
        | "codesandbox"
        | "gist"
        | "spotify"
        | "soundcloud"
        | "custom"
      flag_reason:
        | "spam"
        | "harassment"
        | "hate_speech"
        | "misinformation"
        | "off_topic"
        | "inappropriate"
        | "other"
      moderation_action:
        | "approved"
        | "rejected"
        | "deleted"
        | "restored"
        | "edited"
        | "warned"
      moderation_mode: "none" | "manual" | "auto"
      post_status:
        | "draft"
        | "pending_review"
        | "scheduled"
        | "published"
        | "archived"
        | "deleted"
      post_visibility:
        | "public"
        | "private"
        | "password_protected"
        | "members_only"
        | "paid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attachment_type: ["image", "gif", "link", "file"],
      comment_status: [
        "pending",
        "approved",
        "spam",
        "rejected",
        "deleted",
        "flagged",
      ],
      content_format: ["html", "markdown", "mdx", "plaintext"],
      embed_type: [
        "youtube",
        "vimeo",
        "twitter",
        "codepen",
        "codesandbox",
        "gist",
        "spotify",
        "soundcloud",
        "custom",
      ],
      flag_reason: [
        "spam",
        "harassment",
        "hate_speech",
        "misinformation",
        "off_topic",
        "inappropriate",
        "other",
      ],
      moderation_action: [
        "approved",
        "rejected",
        "deleted",
        "restored",
        "edited",
        "warned",
      ],
      moderation_mode: ["none", "manual", "auto"],
      post_status: [
        "draft",
        "pending_review",
        "scheduled",
        "published",
        "archived",
        "deleted",
      ],
      post_visibility: [
        "public",
        "private",
        "password_protected",
        "members_only",
        "paid",
      ],
    },
  },
} as const
