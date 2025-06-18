"""initial"""
from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'categories',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False, unique=True),
    )
    op.create_index('ix_categories_id', 'categories', ['id'])

    op.create_table(
        'processes',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('category_id', sa.Integer, sa.ForeignKey('categories.id'), nullable=False),
        sa.Column('applicability', sa.Enum('MZ','WP','NZ', name='applicability'), nullable=False),
    )
    op.create_index('ix_processes_id', 'processes', ['id'])


def downgrade() -> None:
    op.drop_index('ix_processes_id', table_name='processes')
    op.drop_table('processes')
    op.drop_index('ix_categories_id', table_name='categories')
    op.drop_table('categories')
