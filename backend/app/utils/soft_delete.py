from datetime import datetime
from sqlalchemy.orm import Session

def perform_soft_delete(db: Session, instance, deleted_by: int):
    instance.is_deleted = True
    instance.deleted_at = datetime.utcnow()
    instance.deleted_by = deleted_by
    db.commit()
    db.refresh(instance)
