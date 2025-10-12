# Multiple Countdown Timers Implementation Plan

## Overview

Transform the single countdown timer application into a multi-timer application with full CRUD functionality and persistent storage.

## Architecture Overview

**Page Flow:**
1. **Main Page (List View)** - Shows all countdown timers
2. **Add/Edit Page** - Create new or edit existing countdown
3. **Navigation** - Simple state-based routing (no router library needed)

**Storage Strategy:**
- Abstract storage interface for easy replacement
- Initial implementation: localStorage
- Future: Can be replaced with API/Database without changing business logic

---

## Detailed Implementation Plan

### 1. Data Structure & Types (`src/lib/types.ts`)

Add new interfaces:

```typescript
// Countdown item
export interface CountdownItem {
  id: string;              // Unique identifier (UUID)
  title: string;           // User-defined name (max 50 chars)
  dob: string;             // Date of birth
  targetAge: number;       // Target age
  targetDate: number;      // Calculated target date timestamp
  format: DisplayFormat;   // Display format
  createdAt: number;       // Timestamp
}

// Page navigation
export type AppPage = 'list' | 'edit' | 'add';

// Confirmation dialog
export interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmText?: string;   // Default: "Confirm"
  cancelText?: string;    // Default: "Cancel"
  onConfirm: () => void;
  onCancel?: () => void;
}
```

Keep existing types:
- `TimeRemaining`
- `DisplayFormat`
- `TimeUnit`

---

### 2. Abstract Storage Interface (`src/lib/storage/ICountdownStorage.ts` - NEW FILE)

Define storage contract:

```typescript
export interface ICountdownStorage {
  /**
   * Get all countdowns from storage
   */
  getAll(): CountdownItem[];

  /**
   * Get a single countdown by ID
   */
  getById(id: string): CountdownItem | null;

  /**
   * Save a new countdown
   */
  create(item: Omit<CountdownItem, 'id' | 'createdAt'>): CountdownItem;

  /**
   * Update an existing countdown
   */
  update(id: string, updates: Partial<CountdownItem>): CountdownItem | null;

  /**
   * Delete a countdown
   */
  delete(id: string): boolean;

  /**
   * Save all countdowns (bulk operation)
   */
  saveAll(items: CountdownItem[]): void;

  /**
   * Clear all countdowns
   */
  clear(): void;
}
```

**Benefits:**
- Easy to swap implementations (localStorage → API → Supabase → etc.)
- Testable (can create mock storage)
- Single responsibility
- Type-safe

---

### 3. LocalStorage Implementation (`src/lib/storage/LocalCountdownStorage.ts` - NEW FILE)

Implement the interface:

```typescript
export class LocalCountdownStorage implements ICountdownStorage {
  private readonly STORAGE_KEY = 'countdown-timers';

  getAll(): CountdownItem[] { ... }
  getById(id: string): CountdownItem | null { ... }
  create(item): CountdownItem { ... }
  update(id, updates): CountdownItem | null { ... }
  delete(id): boolean { ... }
  saveAll(items): void { ... }
  clear(): void { ... }
}
```

Features:
- Generate UUID for new items
- Validate data before saving
- Handle JSON parse errors gracefully
- Return copies to prevent mutations

---

### 4. Storage Factory (`src/lib/storage/index.ts` - NEW FILE)

Export storage instance:

```typescript
import type { ICountdownStorage } from './ICountdownStorage';
import { LocalCountdownStorage } from './LocalCountdownStorage';

// Current implementation
export const countdownStorage: ICountdownStorage = new LocalCountdownStorage();

// Easy to replace:
// export const countdownStorage: ICountdownStorage = new ApiCountdownStorage();
// export const countdownStorage: ICountdownStorage = new SupabaseCountdownStorage();
```

---

### 5. Store Refactoring (`src/stores/countdown.ts` - MAJOR REFACTOR)

Replace single countdown store with multiple timers store:

```typescript
interface CountdownsState {
  items: CountdownItem[];           // All countdowns
  activeId: string | null;          // Currently selected countdown
  currentPage: AppPage;             // Current page view
  timeRemaining: TimeRemaining | null;  // Time for active countdown
}

// Actions
function addCountdown(item: Omit<CountdownItem, 'id' | 'createdAt'>): void
function updateCountdown(id: string, updates: Partial<CountdownItem>): void
function deleteCountdown(id: string): void
function selectCountdown(id: string | null): void
function navigateTo(page: AppPage): void
function getActiveCountdown(): CountdownItem | null

// Load from storage on init
// Save to storage on every change
// Keep interval logic for updating active countdown
```

**Integration with storage:**
- Load all countdowns on store initialization
- Call `countdownStorage.create()` in `addCountdown()`
- Call `countdownStorage.update()` in `updateCountdown()`
- Call `countdownStorage.delete()` in `deleteCountdown()`
- Always keep store and storage in sync

---

### 6. Components Architecture

#### NEW Components

**a) CountdownList.svelte** (Main Page)
- **Empty State:**
  - Page title
  - Empty state icon/illustration (clock, calendar, or hourglass)
  - Message: "No countdowns yet"
  - Add button (+ icon or "Add Countdown")

- **List State:**
  - Vertical list of countdown cards (one per row)
  - Floating "+" button to add new
  - Each card shows countdown item

- **Features:**
  - Load countdowns on mount
  - Sort by time remaining (closest deadline first)
  - All countdowns update live every second
  - Smooth transitions

**b) CountdownItem.svelte** (List Item Component)
- **Props:**
  ```typescript
  countdown: CountdownItem
  timeRemaining: TimeRemaining  // Live updating time
  onEdit: () => void
  onDelete: () => void
  ```

- **Display:**
  - Title (bold/prominent)
  - Target date formatted (e.g., "Target: January 1, 2030 (Age 30)")
  - Time remaining (live update every second) - formatted based on display format
  - Edit icon/button
  - Delete icon/button

- **Styling:**
  - Card layout (vertical list, one per row)
  - Hover effects
  - Responsive design

**c) CountdownEditPage.svelte** (Add/Edit Form)
- **Props:**
  ```typescript
  mode: 'add' | 'edit'
  countdownId?: string  // Required for edit mode
  ```

- **Form Fields:**
  - Title input (NEW - required)
  - Date of birth picker
  - Target age input
  - Display format select

- **Buttons:**
  - Save (validate + save to store)
  - Cancel/Back (navigate to list)
  - Delete (only in edit mode, with confirmation)

- **Validation:**
  - Title required (min 1 char, max 50)
  - Date of birth required and valid
  - Target age required and positive

#### MODIFY Existing Components

**d) App.svelte**
- Remove current single countdown logic
- Add page routing:
  ```svelte
  {#if $countdownsStore.currentPage === 'list'}
    <CountdownList />
  {:else if $countdownsStore.currentPage === 'add'}
    <CountdownEditPage mode="add" />
  {:else if $countdownsStore.currentPage === 'edit'}
    <CountdownEditPage mode="edit" countdownId={$countdownsStore.activeId} />
  {/if}
  ```
- Page transitions (fade in/out)

**e) Components to Reuse/Remove:**
- `CountdownDisplay.svelte` → Reuse for showing time in list items
- `CountdownForm.svelte` → Logic merged into `CountdownEditPage`
- `ControlButtons.svelte` → Remove (no pause/resume)
- `utils.ts` → Keep and reuse (formatTimeDisplay, validation)

---

### 7. Navigation Flow

```
Main Page (List)
  ├─ Click "+" button → Navigate to Add Page (mode='add')
  ├─ Click countdown item → Navigate to Edit Page (mode='edit', id=xxx)
  └─ Empty state → Show "Add Countdown" button

Add Page
  ├─ Fill form + Click Save → Create countdown → Navigate to List
  └─ Click Cancel → Navigate to List (no save)

Edit Page
  ├─ Modify + Click Save → Update countdown → Navigate to List
  ├─ Click Delete → Show confirmation → Delete → Navigate to List
  └─ Click Cancel → Navigate to List (no save)
```

---

### 8. Delete Functionality

**Reusable ConfirmDialog Component:**
- Custom modal component (not browser confirm)
- Props: `ConfirmDialogConfig` interface
- Features:
  - Overlay backdrop
  - Custom title and message
  - Configurable button text
  - onConfirm and onCancel callbacks
  - Accessible (keyboard navigation, focus trap)
- Can be reused anywhere in the app

**From List Page:**
- Delete icon/button on each countdown card
- Click → Show ConfirmDialog
  - Title: "Delete Countdown"
  - Message: "Are you sure you want to delete '{Countdown Title}'?"
  - Confirm: "Delete" / Cancel: "Cancel"
- On confirm:
  - Remove from store (calls `countdownStorage.delete()`)
  - Remove from UI (reactive)

**From Edit Page:**
- Delete button at bottom of form (danger style)
- Click → Show ConfirmDialog (same configuration)
- On confirm:
  - Delete from store
  - Navigate back to list

---

### 9. UI/UX Considerations

- **Transitions:** Smooth fade in/out between pages
- **Empty State:** Friendly message + illustration (optional)
- **Loading States:** Show skeleton/spinner while loading
- **Error Handling:** Toast notifications for errors
- **Responsive:** Mobile-first design
- **Accessibility:** Proper ARIA labels, keyboard navigation
- **Confirmation Dialogs:** Prevent accidental deletions

---

### 10. File Structure

```
src/
├── lib/
│   ├── storage/
│   │   ├── ICountdownStorage.ts         (NEW - Interface)
│   │   ├── LocalCountdownStorage.ts     (NEW - localStorage impl)
│   │   └── index.ts                     (NEW - Export storage instance)
│   ├── types.ts                         (MODIFY - Add CountdownItem, AppPage)
│   └── utils.ts                         (KEEP - Reuse validation & formatting)
├── stores/
│   └── countdown.ts                     (MAJOR REFACTOR - Multiple timers)
├── components/
│   ├── CountdownList.svelte             (NEW - Main page)
│   ├── CountdownItem.svelte             (NEW - List item)
│   ├── CountdownEditPage.svelte         (NEW - Add/edit form)
│   ├── CountdownDisplay.svelte          (REUSE - For time display)
│   ├── CountdownForm.svelte             (REMOVE/MERGE)
│   ├── ControlButtons.svelte            (REMOVE)
│   └── App.svelte                       (MODIFY - Routing)
├── __tests__/
│   └── ... (UPDATE tests)
└── main.ts                              (KEEP)
```

---

## Implementation Order

### Phase 1: Data Layer (Storage & Types)
1. ✅ Create `src/lib/types.ts` updates
   - Add `CountdownItem` interface
   - Add `AppPage` type

2. ✅ Create `src/lib/storage/ICountdownStorage.ts`
   - Define storage interface

3. ✅ Create `src/lib/storage/LocalCountdownStorage.ts`
   - Implement localStorage storage
   - Add UUID generation
   - Handle JSON parsing errors

4. ✅ Create `src/lib/storage/index.ts`
   - Export storage instance

### Phase 2: State Management
5. ✅ Refactor `src/stores/countdown.ts`
   - Create multi-countdown store
   - Integrate with storage
   - Add navigation state
   - Load data on init

### Phase 3: UI Components (Bottom-Up)
6. ✅ Create `src/components/ConfirmDialog.svelte` (Reusable)
   - Abstract confirmation dialog component
   - Props: `ConfirmDialogConfig`
   - Custom modal with overlay
   - Can be reused for any confirmation needs

7. ✅ Create `src/components/CountdownItem.svelte`
   - Display single countdown card
   - Show title, target date, and live updating time
   - Edit/Delete buttons
   - Vertical card layout (one per row)

8. ✅ Create `src/components/CountdownEditPage.svelte`
   - Form for add/edit
   - Title field (max 50 chars)
   - Target date field (calculated and stored)
   - Validation
   - Save/Cancel/Delete actions
   - Uses ConfirmDialog for delete confirmation

9. ✅ Create `src/components/CountdownList.svelte`
   - Empty state with icon/illustration
   - Vertical list of CountdownItem components
   - Sort by time remaining (closest first)
   - Add button
   - Live updates for all countdowns every second

### Phase 4: App Integration
10. ✅ Update `src/components/App.svelte`
   - Remove old single countdown logic
   - Add page routing
   - Page transitions

### Phase 5: Polish & Testing
11. ✅ Remove old components
    - Delete `CountdownForm.svelte`
    - Delete `ControlButtons.svelte`

12. ✅ Update tests
    - Test storage implementation
    - Test store actions
    - Test components

13. ✅ Manual testing
    - Test all CRUD operations
    - Test persistence (refresh page)
    - Test edge cases (empty state, validation)

### Phase 6: Finalization & Deployment
14. ✅ Update documentation
    - Update README.md with new features
    - Document multiple countdown functionality
    - Update screenshots if needed
    - Document storage architecture

15. ✅ Rebuild Docker image
    - Run `docker-compose build`
    - Test Docker container
    - Verify production build works

16. ✅ Git operations
    - Stage all changes: `git add .`
    - Create commit with descriptive message
    - Push to remote: `git push origin telegram-mini-app-features`

17. ✅ Create Pull Request
    - Create PR from `telegram-mini-app-features` to `telegram-mini-app-init`
    - Write comprehensive PR description:
      - Summary of changes
      - New features added
      - Architecture changes (storage abstraction)
      - Breaking changes (if any)
      - Testing performed
    - Include screenshots/GIFs of new UI

---

## Future Enhancements (Post-MVP)

- **Backend Integration:**
  - Create `ApiCountdownStorage implements ICountdownStorage`
  - Replace in `src/lib/storage/index.ts`
  - Add authentication

- **Additional Features:**
  - Search/filter countdowns
  - Categories/tags
  - Notifications
  - Share countdowns
  - Import/export data

- **UI/UX:**
  - Dark mode
  - Custom themes
  - Animations
  - Drag-and-drop reordering

---

## Notes

- Keep changes minimal and focused
- Test each phase before moving to next
- Maintain backward compatibility during transition
- Document any breaking changes
- Follow existing code style and conventions
